const axios = require("axios");

exports.handler = async function () {
  const url =
    process.env.CREDENTIALS_API_URL || "https://api.nettest.testrtc.com/access";
  try {
    const result = await axios.post(`${url}/connectionInfo`, {
      connectionName: "twilio-testrtc-account",
      mediaMode: "routed",
    });
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};
