const { imageProxy } = require('./getImage');
const { parseBody } = require('./parseBody');
const { sanitizeHtmlConfig } = require('./sanitizeConfig');
const { cleanTags, photoTags, removeTags } = require('./cleanTags');
const { processBody } = require('./processBody');
const { getPostLocation } = require('./getPostLocation');
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
  parseBody,
  imageProxy,
  sanitizeHtmlConfig,
  cleanTags,
  photoTags,
  removeTags,
  processBody,
  getPostLocation,
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
