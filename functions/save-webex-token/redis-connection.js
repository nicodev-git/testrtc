const { promisify } = require("util");
const redis = require("redis");
const webexKey = process.env.REDIS_KEY;

const client = redis.createClient({
  port: Number(process.env.REDIS_PORT), // replace with your port
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

exports.save = async (token) => {
  await setAsync(webexKey, token);
  client.expire(webexKey, 60 * 60 * 24 * 30); // 30 days
};

exports.get = async () => getAsync(webexKey);
