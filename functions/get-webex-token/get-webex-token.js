const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);
const config = require('./server-config.js')

exports.handler = async (event) => {
  const token = await get();
  
  return {
    statusCode: 200,
    body: token || "",
  };
};
