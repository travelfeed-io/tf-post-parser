const communities = [
  { title: 'TravelFeed', tag: 'hive-184437', lang: 'en' },
  { title: 'Backpacking', tag: 'hive-166666', lang: 'en' },
  { title: 'Budget Travel', tag: 'hive-133337', lang: 'en' },
  { title: 'Camping and Hiking', tag: 'hive-147474', lang: 'en' },
  { title: 'CycleFeed', tag: 'hive-188888', lang: 'en' },
  { title: 'Digital Nomads', tag: 'hive-199999', lang: 'en' },
  { title: 'Flights', tag: 'hive-122222', lang: 'en' },
  { title: 'Food of the World', tag: 'hive-155555', lang: 'en' },
  { title: 'Hitchhiking', tag: 'hive-177777', lang: 'en' },
  { title: 'Road Trips', tag: 'hive-144444', lang: 'en' },
  { title: 'Solo Travel', tag: 'hive-100705', lang: 'en' },
  { title: 'Travel Hacks', tag: 'hive-100001', lang: 'en' },
  { title: 'Urban Exploration', tag: 'hive-104387', lang: 'en' },
  { title: 'PL-TravelFeed', tag: 'hive-191315', lang: 'pl' },
  { title: 'KR-TravelFeed', tag: 'hive-129292', lang: 'kr' },
  { title: 'CN-TravelFeed', tag: 'hive-123123', lang: 'cn' },
  { title: 'ES-TravelFeed', tag: 'hive-136361', lang: 'es' },
  { title: 'DE-TravelFeed', tag: 'hive-103030', lang: 'de' },
  { title: 'IT-TravelFeed', tag: 'hive-171717', lang: 'it' },
];

const communityList = [];
communities.forEach(({ tag }) => {
  communityList.push(tag);
});

const getCommunity = category => {
  communities.forEach(community => {
    if (community.tag === category) {
      return community;
    }
  });
  return {};
};

module.exports = { communities, communityList, getCommunity };
