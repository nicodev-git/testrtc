const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('../get-webex-token/server-config.js')

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;
  const state = event.queryStringParameters.state;

  console.log(`start-webex-login:handler`);

  console.log(config.authUrl)
  assert(code);
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
    const accessToken = await webex.authorization.requestAuthorizationCodeGrant({ code, state })
      .catch((err) => {
        return {
          statusCode: 500,
          body: JSON.stringify({ err })
        }
      });
    return {
      statusCode: 302,
      body: JSON.stringify({ msg: accessToken }),
      headers: {
        location: "/webex-login.html?token=" + JSON.stringify(accessToken)
      }
    }
  });
};

exports.startWebexLogin = async (code) => {
  console.log(config.authUrl)
  assert(code);
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl,
        clientType: 'confidential'
      }
    }
  });
  await webex.authorization.requestAuthorizationCodeGrant({ code })
  return {
    statusCode: 302,
    body: JSON.stringify({ msg: webex.credentials.supertoken.toJSON() }),
    headers: {
      location: "/webex-login.html" + querystring.stringify(webex.credentials.supertoken.toJSON())
    }
  }
}
