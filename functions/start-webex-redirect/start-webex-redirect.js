const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('../get-webex-token/server-config.js')

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;

  console.log(`start-webex-login:handler`);

  console.log(config.authUrl)
  assert(code);
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl,
        client_secret: config.clientSecret
      }
    }
  });

  await webex.once(`ready`)
  return await webex.authorization.requestAuthorizationCodeGrant(event.queryStringParameters)
    .then(() => {
      return {
        statusCode: 302,
        body: "",
        headers: {
          location: "/webex-login.html"
        }
      }
    })
    .catch((err) => {
      return {
        statusCode: 500,
        body: JSON.stringify({ err }),
        headers: {
          "x-code": code
        }
      }
    });
};
