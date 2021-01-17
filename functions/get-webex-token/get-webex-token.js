const { getUser1AccessToken } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('./server-config.js')

exports.handler = async (event) => {
  const user = event.queryStringParameters.user;
  let token = "";

  if (user && user.toLowerCase() === 'user2') {
    token = getUser2AccessToken();
  } else {
    // Defaulting to user 1
    token = getUser1AccessToken();
  }

  return {
    statusCode: 200,
    body: token,
  };
};
