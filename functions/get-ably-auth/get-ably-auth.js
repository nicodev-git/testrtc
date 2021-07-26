const Ably = require("ably");
const ably = new Ably.Rest({ key: process.env.ABLY_KEY });

exports.handler = async () => {
  const tokenParams = {};

  try {
    const tokenRequest = await new Promise((resolve, reject) => {
      ably.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
        if (err) {
          return reject(err);
        }
        resolve(tokenRequest);
      });
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenRequest),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: "Error requesting token: " + JSON.stringify(err),
    };
  }
};
