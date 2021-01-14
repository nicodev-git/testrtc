const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('./server-config')

exports.handler = async (event) => {
  //const token = await get();
  const code = event.queryStringParameters.code;

  console.log(`get-webex-token:handler`);

  assert(code);
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: config.authUrl,
        clientType: 'confidential'
      }
    }
  });
  webex.requestAuthorizationCodeGrant({code})
    .then(() => {

      res.redirect('/#' + querystring.stringify(webex.credentials.supertoken.toJSON())).end();
    });

  // return {
  //   statusCode: 200,
  //   body: token || "",
  // };
};
