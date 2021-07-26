const authUrl = 'https://webexapis.com/v1/authorize?client_id=C6139709e0ad95b4d3a6027696af489a2047ed63de929939756a6ce6d8fa5db3c&response_type=code&redirect_uri=https%3A%2F%2Ftwilio-playground.netlify.app%2F.netlify%2Ffunctions%2Fstart-webex-redirect&scope=meeting%3Arecordings_read%20spark%3Aall%20meeting%3Aschedules_read%20identity%3Aplaceonetimepassword_create%20meeting%3Aparticipants_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20meeting%3Aschedules_write%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Acontrols_read%20meeting%3Aparticipants_write';
const clientId = 'C6139709e0ad95b4d3a6027696af489a2047ed63de929939756a6ce6d8fa5db3c'
const clientSecret = '2f8b464de0b1ed5f2c025b0b322fa4b28059c7c63ca99d43e49ef0799327b09f'
const redirectUri = 'https://twilio-playground.netlify.app/.netlify/functions/start-webex-redirect'

module.exports = { authUrl, clientId, clientSecret, redirectUri }