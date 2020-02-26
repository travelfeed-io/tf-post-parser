const photoTags = [
  'photofeed',
  'photocircle',
  'photostreem',
  'photo',
  'photomatic',
  'photomag',
  'photofriend',
  'phototalent',
];

const removeTags = [
  'travelfeed',
  'fundition-81n9hwooj',
  'travel',
  'blog',
  'steemitworldmap',
  'blocktradescontest',
  'ntopaz',
  'steempress',
  'newsteem',
  'qurator',
  'blocktrades',
  'adsactly',
  'traveldigest',
  'tripsteem',
  'dtube',
  'threespeak',
  'tokenbb',
  'steemmonsters',
  'tasteem',
  'tasteem-intl',
  'tasteem-food',
  'partiko',
  'steem-travel',
  'busy',
  'actifit',
  'sp-group',
  'artzone',
  'curie',
  'steem',
  'steemit',
  'talentclub',
  'ulog',
  'helpiecake',
  'archisteem',
  'placestoremember',
  'ocd',
  'jjm',
  'ocd-resteem',
  'oc',
  'share2steem',
  'swmchallenge',
  'esteem',
  'powerhousecreatives',
  'palnet',
  'steemleo',
  'lifestyle',
  'creativecoin',
  'neoxian',
  'marlians',
  'realityhubs',
  'zzan',
  'thealliance',
  'whalepower',
  'sct',
  'cervantes',
  'bdvoter',
  'actnearn',
  'dblog',
  'posh',
  'bdcommunity',
  'steempeak',
  'upmewhale',
  'appics',
  'apx',
  'bilpcoin',
];

const cleanTags = (tags, options) => {
  if (!tags) return undefined;
  // Replace all photo tags with "photography"
  photoTags.forEach(i => {
    const index = tags.indexOf(i);
    if (index !== -1) {
      if (tags.indexOf(i) === -1) tags[index] = 'photography';
      else delete tags[index];
    }
  });
  // remove 'travelfeed' from tags
  const taglist = tags.filter(item => {
    // Tags on Steem are often advertising or generic,
    // tags on TravelFeed  are  for discovering post about specific topics,
    // generic tags like "travel" are useless.
    // Project/app tags are confusing for new users.
    // -> hide these tags
    return removeTags.indexOf(item) === -1;
  });
  let tl = [];
  taglist.forEach(tag => {
    if (tag.substring(0, 4) !== 'hive') {
      tl.push(tag);
    }
  });
  // use only first tag for preview cards
  if (options && options.cutTags) tl = [tl[0]];
  if (!taglist || taglist.length < 1) tl = [];
  return tl;
};

module.exports = { cleanTags, photoTags, removeTags };
