function getQueryParameters() {
  const result = {};
  const items = location.search.substr(1).split("&");
  items.forEach((item) => {
    const tmp = item.split("=");
    result[tmp[0]] = decodeURIComponent(tmp[1]);
  });
  return result;
}

exports.getQueryParameters = getQueryParameters;
