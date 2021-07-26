var Webex = require('webex');
const authUrl = process.env.WEBEX_AUTH_URL || "";

exports.handler = async (event) => {
  const user = event.queryStringParameters.user;

  console.log(`start-webex-login:handler`);

  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: authUrl
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
