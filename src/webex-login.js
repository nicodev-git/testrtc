const config = require('./config')
var Webex = require('webex');
async function saveToken() {
  const token = "Sample";
  const url = "/.netlify/functions/save-webex-token";
  fetch(`${url}/?token=${token}`)
    .then((answer) => {
      console.log(`webex-login:saveToken`, { token, answer });
    })
    .catch(console.error);
}

function user1Login() {
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl,
        clientType: 'confidential',
        refreshCallback: function(webex, token) {
          return fetch(`.netlify/functions/refresh-webex-token`, {
            method: `POST`,
            body: JSON.stringify({
              refresh_token: token.refresh_token
            })
          })
          .then((res) => res.json())
        }
      }
    }
  });
  console.log(`webex-login:started`);

  webex.once(`ready`, function () {
  console.log(`webex-login:ready`);

    if (webex.canAuthorize) {
      // your app logic goes here
    }
    else {
      webex.authorization.initiateLogin()
    }
  });
}

function start() {
  document.getElementById("save-token").onclick = function () {
    saveToken();
  };
  document.getElementById("user1-login").onclick = function () {
    user1Login();
  };
  document.getElementById("user2-login").onclick = function () {
    user1Login();
  };
  console.log(`webex-login:start`);
}

start();
