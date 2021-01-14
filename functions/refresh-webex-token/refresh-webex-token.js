const { save } = require("../save-webex-token/redis-connection");
const config = require('../get-webex-token/server-config.js')

// this will be called from CRON
exports.handler = async (event) => {
  // const token = "TBD-refresh-token";
  const refresh_token = event.queryStringParameters.refresh_token;
  // await save(token);

  console.log(`refresh-webex-token:handler`);

  assert(refresh_token);
  var webex = Webex.init({
    credentials: {
      refresh_token: refresh_token
    },
    config: {
      credentials: {
        authorizationString: config.authUrl,
        client_secret: config.clientSecret
      }
    }
  });

  webex.refresh()
    .then(() => {
      res
        .send(webex.credentials.supertoken)
        .end();
    })

  // return {
  //   statusCode: 200,
  //   body: "",
  // };
};
