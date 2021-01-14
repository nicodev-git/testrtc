const { get } = require("../save-webex-token/redis-connection");
var Webex = require('webex');
const assert = require(`assert`);

exports.handler = async (event) => {
  //const token = await get();
  const code = event.queryStringParameters.code;

  console.log(`get-webex-token:handler`);

  assert(code);
  var webex = Webex.init({
    config: {
      credentials: {
        authorizationString: 'https://webexapis.com/v1/authorize?client_id=C6139709e0ad95b4d3a6027696af489a2047ed63de929939756a6ce6d8fa5db3c&response_type=code&redirect_uri=https%3A%2F%2Ftwilio-playground.netlify.app%2Fwebex%2Foauth%2Fredirect&scope=meeting%3Arecordings_read%20meeting%3Aadmin_schedule_write%20meeting%3Aschedules_read%20meeting%3Aparticipants_read%20meeting%3Aadmin_participants_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20meeting%3Aadmin_recordings_read%20meeting%3Aschedules_write%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Aadmin_recordings_write%20meeting%3Acontrols_read%20meeting%3Aparticipants_write%20meeting%3Aadmin_schedule_read&state=set_state_here',
        clientType: 'confidential'
      }
    }
  });
  webex.requestAuthorizationCodeGrant({code})
    .then(() => {

      res.redirect('/#' + querystring.stringify(webex.credentials.supertoken.toJSON())).end();
    });

  // return {
  //   statusCode: 200,
  //   body: token || "",
  // };
};
