const { promisify } = require("util");
const redis = require("redis");
// const webexKey = process.env.REDIS_KEY;
const accessTokenExpiry = 60 * 60 * 24 * 14; // 14 days
const refreshTokenExpiry = 60 * 60 * 24 * 90; // 90 days

const client = redis.createClient({
  port: Number(process.env.REDIS_PORT), // replace with your port
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

/************************** User 1 *****************************/
exports.saveUser1AccessToken = async (token) => {
  await setAsync('webexUser1AccessToken', token);
  client.expire('webexUser1AccessToken', accessTokenExpiry);
};

exports.getUser1AccessToken = async () => getAsync('webexUser1AccessToken');

exports.saveUser1RefreshToken = async (token) => {
  await setAsync('webexUser1RefreshToken', token);
  client.expire('webexUser1RefreshToken', refreshTokenExpiry);
};

exports.getUser1RefreshToken = async () => getAsync('webexUser1RefreshToken');

/************************** User 2 *****************************/
exports.saveUser2AccessToken = async (token) => {
  await setAsync('webexUser2AccessToken', token);
  client.expire('webexUser2AccessToken', accessTokenExpiry);
};

exports.getUser2AccessToken = async () => getAsync('webexUser2AccessToken');

exports.saveUser2RefreshToken = async (token) => {
  await setAsync('webexUser2RefreshToken', token);
  client.expire('webexUser2RefreshToken', refreshTokenExpiry);
};

exports.getUser2RefreshToken = async () => getAsync('webexUser2RefreshToken');