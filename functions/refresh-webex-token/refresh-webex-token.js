const { save } = require("../save-webex-token/redis-connection");

// this will be called from CRON
exports.handler = async (event) => {
  // const token = "TBD-refresh-token";
  const refresh_token = event.queryStringParameters.refresh_token;
  // await save(token);

  console.log(`refresh-webex-token:handler`);

  assert(refresh_token);
  var webex = Webex.init({
    credentials: {
      refresh_token: refresh_token
    },
    config: {
      credentials: {
        authorizationString: "https://webexapis.com/v1/authorize?client_id=C6139709e0ad95b4d3a6027696af489a2047ed63de929939756a6ce6d8fa5db3c&response_type=code&redirect_uri=https%3A%2F%2Ftwilio-playground.netlify.app%2Fwebex%2Foauth%2Fredirect&scope=meeting%3Arecordings_read%20meeting%3Aadmin_schedule_write%20meeting%3Aschedules_read%20meeting%3Aparticipants_read%20meeting%3Aadmin_participants_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20meeting%3Aadmin_recordings_read%20meeting%3Aschedules_write%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Aadmin_recordings_write%20meeting%3Acontrols_read%20meeting%3Aparticipants_write%20meeting%3Aadmin_schedule_read&state=set_state_here",
        client_secret: "b972772f4d16b0beff8f3bcc156212af67713f04c4281bea5e032ff1f4d78a9f"
      }
    }
  });

  webex.refresh()
    .then(() => {
      res
        .send(webex.credentials.supertoken)
        .end();
    })

  // return {
  //   statusCode: 200,
  //   body: "",
  // };
};
