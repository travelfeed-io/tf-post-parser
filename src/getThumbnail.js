const imgRegex = /<img src="([^"]*)"/;

const getThumbnail = (img, json, body) => {
  if (img) return img;
  if (json && json.image && json.image[0].length > 0) {
    return json.image[0];
  }
  const match = body.match(imgRegex);
  if (match && match[1]) return match[1];
};

module.exports = {
  getThumbnail,
};
