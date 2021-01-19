var Webex = require('webex');
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
