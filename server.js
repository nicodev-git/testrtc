const express = require('express');
const app = express();
const path = require('path');

const  { getTwilioToken } = require("./functions/get-token/get-twilio-token");
const { getAgoraToken } = require("./functions/get-token-agora/get-agora-token");

const Ably = require("ably");
const ably = new Ably.Rest({ key: process.env.ABLY_KEY ? process.env.ABLY_KEY : '9cDWkA.TWPRGg:uSGzxxldE2KeRWNS'});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/token', async (req, res) => {
  res.send(await getTwilioToken(req.query));
});

app.get("/ably-auth", (req, res) => {
  const tokenParams = {};
  ably.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
    if (err) {
      res.status(500).send("Error requesting token: " + JSON.stringify(err));
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(tokenRequest));
  });
});

app.get("/agora-token", async (req, res) => {
  res.send(await getAgoraToken(req.query));
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));






app.listen(8081, () => console.log('token server running on 8081'));
