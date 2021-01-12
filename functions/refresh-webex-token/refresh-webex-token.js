const { save } = require("../save-webex-token/redis-connection");

// this will be called from CRON
exports.handler = async () => {
  const { token } = "TBD-refresh-token";
  console.log(`refresh-webex-token:handler`);
  await save(token);

  return {
    statusCode: 200,
    body: "",
  };
};
