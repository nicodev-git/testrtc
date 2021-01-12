
async function saveToken() {
    const token = "Sample";
    console.log(`webex-login:saveToken`, {token});
}

function start() {
    document.getElementById("save-token").onclick = function() {saveToken()};
    console.log(`webex-login:start`);
};

start();
