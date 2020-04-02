const communities = [
  { title: 'TravelFeed', id: 184437, lang: 'en' },
  { title: 'Backpacking', id: 166666, lang: 'en', tag: 'backpacking' },
  { title: 'Budget Travel', id: 133337, lang: 'en', tag: 'budgettravel' },
  { title: 'Outdoors', id: 113634, lang: 'en', tag: 'outdoors' },
  { title: 'CycleFeed', id: 188888, lang: 'en', tag: 'cyclefeed' },
  { title: 'Digital Nomads', id: 199999, lang: 'en', tag: 'digitalnomads' },
  { title: 'Flights', id: 122222, lang: 'en' },
  { title: 'Food of the World', id: 155555, lang: 'en', tag: 'foodoftheworld' },
  { title: 'Hitchhiking', id: 177777, lang: 'en', tag: 'hitchhiking' },
  { title: 'Road Trips', id: 144444, lang: 'en', tag: 'roadtrip' },
  { title: 'Solo Travel', id: 100705, lang: 'en' },
  { title: 'Travel Hacks', id: 100001, lang: 'en' },
  { title: 'Urban Exploration', id: 104387, lang: 'en', tag: 'urbex' },
  { title: 'PL-TravelFeed', id: 191315, lang: 'pl', tag: 'pl-travelfeed' },
  { title: 'KR-TravelFeed', id: 129292, lang: 'kr', tag: 'kr-travelfeed' },
  { title: 'CN-TravelFeed', id: 123123, lang: 'cn', tag: 'cn-travelfeed' },
  { title: 'ES-TravelFeed', id: 136361, lang: 'es', tag: 'es-travelfeed' },
  { title: 'DE-TravelFeed', id: 103030, lang: 'de', tag: 'de-travelfeed' },
  { title: 'IT-TravelFeed', id: 171717, lang: 'it', tag: 'it-travelfeed' },
];

const communityList = [];
communities.forEach(({ tag }) => {
  communityList.push(tag);
});

const communityIdList = [];
communities.forEach(({ id }) => {
  communityIdList.push(id);
});

const getCommunity = (category, tags, location) => {
  let res;
  communities.forEach(community => {
    if (`hive-${community.id}` === category) {
      res = community;
    }
  });
  // If no community set estimate community from tag
  if (!res && tags) {
    communities.forEach(community => {
      if (tags.indexOf(community.tag) !== -1) {
        res = community;
      }
    });
  }
  if (!res && tags) {
    if (tags.indexOf('traveladvice') !== -1 && !location) {
      res = { title: 'Travel Hacks', id: 100001, lang: 'en' };
    }
  }
  // If no community, set standard community
  if (!res) {
    res = { title: 'TravelFeed', id: 184437, lang: 'en' };
  }
  return res;
};

module.exports = { communities, communityList, communityIdList, getCommunity };
