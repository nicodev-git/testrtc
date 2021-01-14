const express = require('express');
const app = express();
const path = require('path');
const assert = require(`assert`);

const  { getTwilioToken } = require("./functions/get-token/get-twilio-token");

app.use(express.static(path.join(__dirname, 'build')));

app.get('/token', async (req, res) => {
  res.send(await getTwilioToken(req.query));
});

app.get(`/webex/oauth/redirect`, function(req, res) {
  assert(req.params.code);
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: '',
        clientType: 'confidential'
      }
    }
  });
  webex.requestAuthorizationCodeGrant(req.params)
    .then(() => {

      res.redirect('/#' + querystring.stringify(webex.credentials.supertoken.toJSON())).end();
    });
});

app.get('/webex/oauth/refresh', function(req, res) {
  assert(req.params.refresh_token);
  var webex = Webex.init({
    credentials: {
      refresh_token: req.params.refresh_token
    },
    config: {
      credentials: {
        authorizationString: "",
        client_secret: ""
      }
    }
  });

  webex.refresh()
    .then(() => {
      res
        .send(webex.credentials.supertoken)
        .end();
    })
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.listen(8081, () => console.log('token server running on 8081'));
