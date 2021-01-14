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
        clientType: 'confidential'
      }
    }
  });
  await webex.authorization.requestAuthorizationCodeGrant({ code })
  .catch((err) => {
    return {
      statusCode: 500,
      body: JSON.stringify({ err })
    }
  });
  return {
    statusCode: 302,
    body: JSON.stringify({ msg: webex.credentials}),
    headers: {
      location: "/webex-login.html" + querystring.stringify(webex.credentials.supertoken)
    }
  }
  // webex.authorization.requestAuthorizationCodeGrant({ code })
  //   .then(async () => {
  //     await save(webex.credentials.supertoken.toJSON());
  //     res.redirect('/webex-login.html' + querystring.stringify(webex.credentials.supertoken.toJSON())).end();
  //   }).catch((err) => {
  //     console.log(err);
  //     return {
  //       statusCode: 500,
  //       body: err || "",
  //     };
  //   });
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
    body: JSON.stringify({ msg: webex.credentials.supertoken.toJSON()}),
    headers: {
      location: "/webex-login.html" + querystring.stringify(webex.credentials.supertoken.toJSON())
    }
  }
}
