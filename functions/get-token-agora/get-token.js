const { getAgoraToken } = require("./get-agora-token");

exports.handler = async (event) => {
  const { channel, account } = event.queryStringParameters;
  if (account) {
    return {
      statusCode: 200,
      body: await getAgoraToken(channel, account),
    };
  } else {
    throw new Error(`Missing account parameter`);
  }
};
