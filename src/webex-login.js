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

function start() {
  document.getElementById("save-token").onclick = function () {
    saveToken();
  };
  console.log(`webex-login:start`);

  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: '',
        clientType: 'confidential',
        refreshCallback: function(webex, token) {
          return fetch(`/webex/oauth/refresh`, {
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

  webex.once(`ready`, function () {
    if (webex.canAuthorize) {
      // your app logic goes here
    }
    else {
      webex.authorization.initiateLogin()
    }
  });
}

start();
