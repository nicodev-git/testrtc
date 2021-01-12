const { save } = require("./redis-connection");

exports.handler = async (event) => {
  const { token } = event.queryStringParameters;
  await save(token);
  console.log(`save-webex-token:handler`, { token });
  return {
    statusCode: 200,
    body: "OK",
  };
};
