const Nominatim = require('node-nominatim2');
const { swmregex } = require('./helpers/regex.js');

const options = {
  useragent: 'TravelFeed',
  referer: 'https://github.com/xbgmsharp/node-nominatim2',
  timeout: 1000,
};
const nominatim = new Nominatim(options);

const getLocation = (coordinates, category) => {
  return new Promise(resolve => {
    try {
      nominatim.reverse(
        { lat: coordinates.latitude, lon: coordinates.longitude },
        (err, res, data) => {
          if (err || !data || !data.address)
            resolve({
              coordinates: {
                type: 'Point',
                coordinates: [coordinates.latitude, coordinates.longitude],
              },
            });
          else {
            let subDivision = data.address.state;
            if (!subDivision) subDivision = data.address.region;
            if (!subDivision) subDivision = data.address.state_district;
            if (!subDivision) subDivision = data.address.county;
            resolve({
              countryCode: data.address.country_code,
              subDivision: (category !== 'country' && subDivision) || undefined,
              city:
                (category !== 'country' &&
                  category !== 'subdivision' &&
                  data.address.city) ||
                undefined,
              coordinates: {
                type: 'Point',
                coordinates: [coordinates.latitude, coordinates.longitude],
              },
            });
          }
        },
      );
    } catch (error) {
      resolve({
        coordinates: {
          type: 'Point',
          coordinates: [coordinates.latitude, coordinates.longitude],
        },
      });
    }
  });
};

const getPostLocation = (body, json) => {
  if (json.location) {
    return getLocation(json.location).then(res => {
      return res;
    });
  }
  const swm = swmregex.exec(body);
  if (swm && swm.length > 2) {
    return getLocation({ latitude: swm[1], longitude: swm[2] }).then(res => {
      return res;
    });
  }
  return undefined;
};

module.exports = { getPostLocation };
