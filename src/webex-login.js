function start() {
  document.getElementById("user1-login").onclick = function () {
    window.location.replace("https://twilio-playground.netlify.app/.netlify/functions/start-webex-login?user=user1");
  };
  document.getElementById("user2-login").onclick = function () {
    window.location.replace("https://twilio-playground.netlify.app/.netlify/functions/start-webex-login?user=user2");
  };
  console.log(`webex-login:start`);
}

start();
