const bs58 = require('bs58');

const urlSafeBase64 = string =>
  Buffer.from(string)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

// Recover the original source URL from a legacy images.hive.blog or
// steemitimages.com proxy wrapper. Handles nested wrappers (e.g. legacy posts
// where a steemitimages URL itself encodes another URL).
const unwrapLegacyProxy = url => {
  let current = url;
  for (let i = 0; i < 5; i++) {
    const pMatch = current.match(
      /^https:\/\/(?:images\.hive\.blog|steemitimages\.com)\/p\/([^/?]+)/,
    );
    if (pMatch) {
      try {
        const decoded = Buffer.from(bs58.decode(pMatch[1])).toString('utf8');
        if (decoded.startsWith('http')) {
          current = decoded.split('?')[0];
          continue;
        }
      } catch (e) {
        // not valid bs58 — stop unwrapping
      }
    }
    const sizeMatch = current.match(
      /^https:\/\/images\.hive\.blog\/\d+x\d+\/(https?:\/\/.+)$/,
    );
    if (sizeMatch) {
      current = sizeMatch[1];
      continue;
    }
    break;
  }
  return current;
};

const imageProxy = (url, width, height, mode, format, alwaysConvert) => {
  if (!url) return undefined;
  if (url.match(/img\.travelfeed\.io/) && !alwaysConvert) return url;

  // 3speak sometimes double-prefixes its IPFS gateway. Strip the outer one.
  if (
    url.match(
      /(https:\/\/ipfs-3speak\.b-cdn\.net\/ipfs\/)https:\/\/ipfs-3speak\.b-cdn\.net\/ipfs\/(?:.*)/,
    )
  ) {
    url = url.replace(/^https:\/\/ipfs-3speak\.b-cdn\.net\/ipfs\//, '');
  }

  try {
    const source = unwrapLegacyProxy(url);
    const encoded = urlSafeBase64(source);
    return (
      'https://img.truvvle.com/?src=' +
      encoded +
      (width ? '&width=' + width : '') +
      (height ? '&height=' + height : '')
    );
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

module.exports = { imageProxy };
