const Ably = require("ably");
const EventEmitter = require("events");
const utils = require("./utils");
const opentok = require("./opentok");

class AblyWebRTC extends EventEmitter {
  constructor(stream) {
    super();

    this.stream = stream;
    this.ably = new Ably.Realtime({ authUrl: "/ably-auth", log: { level: 4 } });
    this.connection = this.ably.connection;
    this.connection.once("connected", () => {
      this.emit("connected", this.connection);

      // Subscribe to our channel.
      this.myChannel = this.ably.channels.get(this.connection.id);
      this.myChannel.subscribe((message) => {
        this.handleMessage(message).catch((err) => {
          console.error(`muly:AblyWebRTC:Got Message ${err.message}`, {
            err: err.stack,
          });
        });
      });
    });
  }

  async handleMessage(message) {
    console.log("GOT", message.name, message);
    if (message.name === "offer" && !this.pc) {
      this.otherChannel = this.ably.channels.get(message.connectionId);
      await this.createPeerConnection(this.connection.id);
    } else if (!this.pc) {
      console.log("missing peerconnection");
      return;
    }

    let answer;
    switch (message.name) {
      case "offer":
        await this.pc.setRemoteDescription(message.data);
        answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        this.otherChannel.publish(
          "answer",
          JSON.parse(JSON.stringify(this.pc.localDescription))
        );
        break;
      case "answer":
        this.pc.setRemoteDescription(message.data);
        break;
      case "candidate":
        this.pc.addIceCandidate(message.data);
        break;
    }
  }

  async call(otherId) {
    this.otherChannel = this.ably.channels.get(otherId);
    await this.createPeerConnection(otherId);
    const offer = await this.pc.createOffer();
    this.otherChannel.publish("offer", JSON.parse(JSON.stringify(offer)));
    this.pc.setLocalDescription(offer);
  }

  async createPeerConnection(rtcRoomId) {
    const queryParams = utils.getQueryParameters();
    const account = queryParams.account;
    const iceServers = await getTestCredentials(account);

    const config = {
      iceServers: iceServers,
      watchrtc: {
        rtcApiKey:
          queryParams.rtcApiKey || "e39c1b92-a6ca-4486-83db-1cf15c63cde8",
        rtcPeerId: Math.random().toString(36).substring(7),
        rtcRoomId: rtcRoomId,
      },
    };

    console.log(`AblyWebRTC:createPeerConnection`, { config, account });
    this.pc = new RTCPeerConnection(config);
    this.pc.addEventListener("icecandidate", this.onicecandidate.bind(this));
    this.pc.addEventListener("track", this.ontrack.bind(this));
    if (this.stream) {
      this.stream.getTracks().forEach((t) => this.pc.addTrack(t, this.stream));
    }
  }

  onicecandidate(e) {
    this.otherChannel.publish(
      "candidate",
      e.candidate ? JSON.parse(JSON.stringify(e.candidate)) : null
    );
  }
  ontrack(e) {
    this.emit("track", e);
  }
}

async function getTestCredentials(account) {
  const connectionInfoUrl = "https://api.nettest.testrtc.com/access";
  let result;
  let iceServers = [];

  console.log("account - " + account);

  if (account && account != "none") {
    if (account === "opentok") {
      result = await utils.getConnectionInfo(connectionInfoUrl, "tokbox");
    } else if (account === "twilio") {
      result = await utils.getConnectionInfo(
        connectionInfoUrl,
        "twilio-testrtc-account"
      );
    } else {
      result = await utils.getConnectionInfo(connectionInfoUrl, account);
    }
  }

  if (result && result.testCredentials) {
    iceServers = result.testCredentials;
  } else if (account === "opentok") {
    iceServers = await opentok.getTokboxIceServers(result);
  } else if (result) {
    iceServers = [
      {
        username: result.username,
        credential: result.credential,
        urls: result.turnServers,
      },
    ];
  } else {
    // No account name provided, using default ice servers
    iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
  }

  console.log("iceServers");
  console.log(iceServers);

  return iceServers;
}

module.exports = AblyWebRTC;
