const { save } = require("../save-webex-token/redis-connection");

// this will be called from CRON
exports.handler = async () => {
  const token = "TBD-refresh-token";
  await save(token);

  console.log(`refresh-webex-token:handler`);

  return {
    statusCode: 200,
    body: "",
  };
};
