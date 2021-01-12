const { get } = require("./redis-connection");

exports.handler = async () => {
  const token = await get();

  console.log(`muly:get-token:handler`, { token });
  return {
    statusCode: 200,
    body: { token },
  };
};
