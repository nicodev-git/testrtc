const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

exports.getAgoraToken = async (channelName, account) => {
  console.log(`getAgoraToken account:${account} channel:${channelName}`);

  // Rtc Examples
  const appID = "b798315d974c40e380ae6b8550f40e08";
  const appCertificate = "d24f4d265b5f4075b97a941023700466";
  // const channelName = "agora-playground";
   const uid = 0;
  // const account = "2882341273";
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  
  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log("Token With Integer Number Uid: " + tokenA);
  return tokenA;
  

  // // Build token with user account
  // const tokenB = await RtcTokenBuilder.buildTokenWithAccount(
  //   appID,
  //   appCertificate,
  //   channelName,
  //   account,
  //   role,
  //   privilegeExpiredTs
  // );
  // console.log("Token With UserAccount: " + tokenB);
  // return tokenB;
};
