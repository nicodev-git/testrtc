const OT = require("@opentok/client");

async function getTokboxIceServers(connectionInfo) {
    const session = new (OT.Session)(connectionInfo.providerApiKey, connectionInfo.sessionId);
    const sessionInfo = await new Promise((resolve, reject) => {
        session.connect(connectionInfo.token, (err) => {
            if (err) {
                console.log("Error getTokboxIceServers", err);
                return reject(err);
            }
            resolve(session.sessionInfo);
        });
    });

    // tokbox is still using .url, not .urls!
    const iceServers = sessionInfo.iceServers.map(({ urls, url, ...s }) => ({
        ...s,
        urls: urls || url,
    }));
    return iceServers;
}

exports.getTokboxIceServers = getTokboxIceServers;