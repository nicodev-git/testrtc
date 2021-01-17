const express = require('express');
const app = express();
const path = require('path');

const  { getTwilioToken } = require("./functions/get-token/get-twilio-token");
const  { startWebexRedirect } = require("./functions/start-webex-redirect/start-webex-redirect");

app.use(express.static(path.join(__dirname, 'build')));

app.get('/token', async (req, res) => {
  res.send(await getTwilioToken(req.query));
});

app.get('/start-webex-redirect', async (req, res) => {
  res.send(await startWebexRedirect(req.query));
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.listen(8081, () => console.log('token server running on 8081'));
