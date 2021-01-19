const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('../get-webex-token/server-config.js')

exports.handler = async (event) => {
  const user = event.queryStringParameters.user;

  console.log(`start-webex-login:handler`);

  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl
      }
    }
  });

  await webex.once(`ready`);
  let url = await webex.credentials.buildLoginUrl({ clientType: 'confidential' })
  url += "&state="+(user?user:'user1')
  console.log('start-webex-login:url ' + url)
  return {
    statusCode: 302,
    body: "",
    headers: {
      location: url
    }
  }
};

exports.startWebexLogin = async (code) => {
  //console.log(config.authUrl)
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl,
        client_secret: config.clientSecret,
        clientType: 'confidential'
      }
    }
  });

  webex.once(`ready`, async () => {
    console.log('webex:ready')
    let url = await webex.credentials.buildLoginUrl({ clientType: 'confidential' })
    console.log('webex:url ' + url)
    return await webex.authorization.requestAuthorizationCodeGrant({ code })
      .then(() => {
        return {
          statusCode: 302,
          body: JSON.stringify({ msg: url }),
          headers: {
            location: "/webex-login.html?token=" + JSON.stringify({ url })
          }
        }
      })
      .catch((err) => {
        return {
          statusCode: 500,
          body: JSON.stringify({ err })
        }
      });
  });
}
