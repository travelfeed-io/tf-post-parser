const { imageProxy } = require('./getImage');
const { cleanTags, photoTags, removeTags } = require('./cleanTags');
const { asyncForEach } = require('./asyncForEach');
const {
  communities,
  communityList,
  communityIdList,
  getCommunity,
} = require('./communities');
const { getThumbnail } = require('./getThumbnail');
const { calculateScore } = require('./calculateScore');
const { escapeString } = require('./escapeString');
const {
  slugFromCC,
  nameFromCC,
  ccFromSlug,
  nameFromSlug,
  randomCountry,
  popularCountries,
} = require('./countryCodes');

module.exports = {
  imageProxy,
  cleanTags,
  photoTags,
  removeTags,
  communities,
  communityList,
  communityIdList,
  getCommunity,
  asyncForEach,
  getThumbnail,
  calculateScore,
  escapeString,
  slugFromCC,
  nameFromCC,
  ccFromSlug,
  nameFromSlug,
  randomCountry,
  popularCountries,
};
