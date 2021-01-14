const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('../get-webex-token/server-config.js')

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;

  console.log(`start-webex-login:handler`);

  return startWebexLogin(code);
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
  webex.authorization.requestAuthorizationCodeGrant({ code })
    .then(async () => {
      await save(webex.credentials.supertoken.toJSON());
      res.redirect('/webex-login.html' + querystring.stringify(webex.credentials.supertoken.toJSON())).end();
    });
}
