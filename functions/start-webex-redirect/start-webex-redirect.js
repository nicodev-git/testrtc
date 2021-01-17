const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const axios = require('axios')
var querystring = require('querystring');
const config = require('../get-webex-token/server-config.js')

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;

  console.log(`start-webex-redirect:handler`);

  console.log(config.authUrl)
  assert(code);
  // var webex = Webex.init({
  //   config: {
  //     credentials: {
  //       authorizationString: config.authUrl,
  //       client_secret: config.clientSecret
  //     }
  //   }
  // });

  // await webex.once(`ready`)
  // return await webex.authorization.requestAuthorizationCodeGrant({code, grant_type:'authorization_code'})
  //   .then(() => {
  //     return {
  //       statusCode: 302,
  //       body: "",
  //       headers: {
  //         location: "/webex-login.html"
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify({ err }),
  //       headers: {
  //         "x-code": code
  //       }
  //     }
  //   });

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