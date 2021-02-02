const version = "1.0.3";
console.log("version", version);

const utils = require("./utils");

const params = utils.getQueryParameters();
const watchrtcEnabled = params.watchrtc === "true";

console.log("params")
console.log(params)

if (watchrtcEnabled) {
  require("watchrtc.js")();
}

const Ably = require("./AblyWebRTC");

const initialHash = window.location.hash.substr(1);
navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then((stream) => {
    document.getElementById("localVideo").srcObject = stream;
    const ably = new Ably(stream);
    ably.once("connected", () => {
      console.log("connected!", ably.connection.id);
      window.location.hash = ably.connection.id;
      if (initialHash.length) {
        ably.call(initialHash);
      }
    });
    ably.on("track", (e) => {
      document.getElementById("remoteVideo").srcObject = e.streams[0];
    });
    window.ably = ably;
  });
