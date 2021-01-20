const { saveUser1AccessToken, saveUser1RefreshToken, getUser1RefreshToken, saveUser2AccessToken, saveUser2RefreshToken, getUser2RefreshToken } = require("../save-webex-token/redis-connection");
const axios = require('axios')
var querystring = require('querystring');
const clientId = process.env.WEBEX_CLIENT_ID || "";
const clientSecret = process.env.WEBEX_CLIENT_SECRET || "";

// this will be called from CRON
exports.handler = async (event) => {
  const user = event.queryStringParameters.user;
  let refreshToken = "";

  console.log(`refresh-webex-token:handler`);

  if (user && user.toLowerCase() == 'user2') {
    refreshToken = await getUser2RefreshToken()
  } else {
    refreshToken = await getUser1RefreshToken()
  }

  var data = querystring.stringify({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken
  });
  var axiosConfig = {
    method: 'post',
    url: 'https://webexapis.com/v1/access_token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  console.log(`refresh-webex-token:user ` + user);

  return await axios(axiosConfig)
    .then((res) => {
      console.log(`statusCode: ${res.status}`)
      //console.log(res)

      if (res.status == 200) {
        if (user && user.toLowerCase() === 'user2') {
          console.log('user2 access token: ' + res.data.access_token)
          saveUser2AccessToken(res.data.access_token);
          saveUser2RefreshToken(res.data.refresh_token);
        } else {
          console.log('user1 access token: ' + res.data.access_token)
          saveUser1AccessToken(res.data.access_token);
          saveUser1RefreshToken(res.data.refresh_token);
        }

        return {
          statusCode: 200,
          body: "Success"
        }
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify(res)
        }
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error })
      }
    })
};
