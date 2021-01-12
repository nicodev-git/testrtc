async function saveToken() {
  const token = "Sample";
  const url = "/.netlify/functions/save-webex-token";
  fetch(`${url}/?token${token}`)
    .then((answer) => {
      console.log(`webex-login:saveToken`, { token, answer });
    })
    .catch(console.error);
}

function start() {
  document.getElementById("save-token").onclick = function () {
    saveToken();
  };
  console.log(`webex-login:start`);
}

start();
