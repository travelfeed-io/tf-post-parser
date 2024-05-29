const bs58 = require('bs58');

const imageProxy = (url, width, height, mode, format) => {
  if (!url) {
    return undefined;
  }
  const isGif = url.substring(url.length - 3, url.length) === 'gif';
  try {
    let imgUrl = url;
    if (imgUrl.match(/images\.hive\.blog/)) {
      const hiveProxyMatch = imgUrl.match(
        /https:\/\/images\.hive\.blog\/p\/([^/]*)/,
      );
      if (isGif) return imgUrl;
      if (hiveProxyMatch && hiveProxyMatch.length > 1) {
        return `https://images.hive.blog/p/${
          hiveProxyMatch[1]
        }/?format=${format || 'match'}${width ? `&width=${width}` : ''}${
          height ? `&height=${height}` : ''
        }${mode ? `&mode=${mode}` : ''}`;
      }
    }

    if (
      !imgUrl.match(/img\.travelfeed\.io/) &&
      !imgUrl.match(/steemitimages\.com/) &&
      !imgUrl.match(/files\.steempeak\.com/) &&
      !imgUrl.match(/files\.peakd\.com/) &&
      !imgUrl.match(/images\.hive\.blog/) &&
      !imgUrl.match(/images\.unsplash\.com/) &&
      !imgUrl.match(/img\.esteem\.app/) &&
      !imgUrl.match(/images\.ecency\.com/)
    ) {
      // Steemitimages needs to be used because it has a cache of images deleted from the origin
      // Base58 encode image url
      // https://github.com/steemit/imagehoster
      const bytes = Buffer.from(imgUrl);
      const address = bs58.encode(bytes);
      // Get the cropped steemitimages URL for an image
      imgUrl = `https://steemitimages.com/p/${address}/?format=match&mode=fit`;
    }
    // Base58 encode image url
    // https://github.com/steemit/imagehoster
    const bytes = Buffer.from(imgUrl);
    const address = bs58.encode(bytes);
    // Use webp as format for best compression if supported
    // Get the cropped steemitimages URL for an image
    return `https://images.hive.blog/p/${address}/?format=${format || 'match'}${
      width ? `&width=${width}` : ''
    }${height ? `&height=${height}` : ''}${mode ? `&mode=${mode}` : ''}${
      isGif ? `&type=gif` : ''
    }`;
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

module.exports = { imageProxy };
