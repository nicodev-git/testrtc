const { getUser1AccessToken, getUser2AccessToken, getUser1RefreshToken, getUser2RefreshToken } = require("../save-webex-token/redis-connection");

exports.handler = async (event) => {
  const user = event.queryStringParameters.user;
  let accessToken = "";
  let refreshToken = "";
  console.log('get-webex-token: user ' + user)

  if (user && user.toLowerCase() === 'user2') {
    accessToken = await getUser2AccessToken();
    refreshToken = await getUser2RefreshToken();
  } else {
    // Defaulting to user 1
    accessToken = await getUser1AccessToken();
    refreshToken = await getUser1RefreshToken();
  }

  console.log('get-webex-token: token ' + accessToken)

  return {
    statusCode: 200,
    body: JSON.stringify({ accessToken, refreshToken }),
  };
};
