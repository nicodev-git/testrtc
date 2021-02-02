function getQueryParameters() {
  const result = {};
  const items = location.search.substr(1).split("&");
  items.forEach((item) => {
    const tmp = item.split("=");
    result[tmp[0]] = decodeURIComponent(tmp[1]);
  });
  return result;
}

async function getConnectionInfo(connectionInfoUrl, connectionName) {
  try {
    const data = {
      connectionName,
    };

    const response = await axios.post(
      `${connectionInfoUrl}/connectionInfo`,
      data
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to get connection info");
  }
}

exports.getQueryParameters = getQueryParameters;
exports.getConnectionInfo = getConnectionInfo;
