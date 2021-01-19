const { saveUser1AccessToken, saveUser2AccessToken, saveUser1RefreshToken, saveUser2RefreshToken } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const axios = require('axios')
var querystring = require('querystring');
const config = require('../get-webex-token/server-config.js')

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;
  const state = event.queryStringParameters.state;

  console.log(`start-webex-redirect:handler`);
  assert(code);

  var data = querystring.stringify({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: config.redirectUri
  });
  var axiosConfig = {
    method: 'post',
    url: 'https://webexapis.com/v1/access_token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  console.log(`start-webex-redirect:code ` + code);
  console.log(`start-webex-redirect:state ` + state);
  return await axios(axiosConfig)
    .then((res) => {
      console.log(`statusCode: ${res.status}`)
      console.log(res)

      if (res.status == 200) {
        if (state && state.toLowerCase() === 'user2') {
          console.log('user2 access token: ' + res.data.access_token)
          saveUser1AccessToken(res.data.access_token);
          saveUser1RefreshToken(res.data.refresh_token);
        } else {
          console.log('user1 access token: ' + res.data.access_token)
          saveUser2AccessToken(res.data.access_token);
          saveUser2RefreshToken(res.data.refresh_token);
        }

        return {
          statusCode: 302,
          body: "",
          headers: {
            location: "/webex-login.html"
          }
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

exports.startWebexRedirect = async ({ code }) => {
  console.log(config.clientId)
  console.log(config.clientSecret)
  console.log(config.redirectUri)
  var data = querystring.stringify({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: config.redirectUri
  });
  var axiosConfig = {
    method: 'post',
    url: 'https://webexapis.com/v1/access_token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  return axios(axiosConfig)
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
      return {
        statusCode: 302,
        body: "",
        headers: {
          location: "/webex-login.html"
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
}