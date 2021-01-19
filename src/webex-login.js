const config = require('./config.js')
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

function userLogin(user) {
  console.log(`webex-login:started`);
  console.log(config.authUrl)
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl+"&state="+user,
        clientType: 'confidential'
      }
    }
  });

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
    window.location.replace("https://webex-playground.netlify.app/.netlify/functions/start-webex-login?user=user1");
    //userLogin('user1');
  };
  document.getElementById("user2-login").onclick = function () {
    //userLogin('user2');
    window.location.replace("https://webex-playground.netlify.app/.netlify/functions/start-webex-login?user=user2");
  };
  console.log(`webex-login:start`);
}

start();
