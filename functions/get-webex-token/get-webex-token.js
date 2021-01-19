const { getUser1AccessToken } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('./server-config.js')

exports.handler = async (event) => {
  const user = event.queryStringParameters.user;
  let token = "";
  console.log('get-webex-token: user ' + user)

  if (user && user.toLowerCase() === 'user2') {
    token = await getUser2AccessToken();
  } else {
    // Defaulting to user 1
    token = await getUser1AccessToken();
  }

  console.log('get-webex-token: token ' + token)

  return {
    statusCode: 200,
    body: token,
  };
};
