const { get } = require("../save-webex-token/redis-connection");

exports.handler = async () => {
  const token = await get();

  console.log(`get-webex-token:handler`, { token });
  return {
    statusCode: 200,
    body: token || "",
  };
};
