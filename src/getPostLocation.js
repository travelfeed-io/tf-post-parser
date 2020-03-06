const Nominatim = require('node-nominatim2');
const { swmregex } = require('./helpers/regex.js');

const options = {
  useragent: 'TravelFeed',
  referer: 'https://github.com/xbgmsharp/node-nominatim2',
  timeout: 1000,
};
const nominatim = new Nominatim(options);

const getLocation = (coordinates, category) => {
  let resCoordinates = {
    type: 'Point',
    coordinates: [coordinates.longitude, coordinates.latitude],
  };
  if (coordinates.longitude === undefined || coordinates.latitude === undefined)
    resCoordinates = undefined;
  return new Promise(resolve => {
    try {
      nominatim.reverse(
        { lat: coordinates.latitude, lon: coordinates.longitude },
        (err, res, data) => {
          if (err || !data || !data.address)
            resolve({
              coordinates: resCoordinates,
            });
          else {
            let subdivision = data.address.state;
            if (!subdivision) subdivision = data.address.region;
            if (!subdivision) subdivision = data.address.state_district;
            if (!subdivision) subdivision = data.address.county;
            resolve({
              countryCode: data.address.country_code,
              subdivision: (category !== 'country' && subdivision) || undefined,
              city:
                (category !== 'country' &&
                  category !== 'subdivision' &&
                  data.address.city) ||
                undefined,
              coordinates: resCoordinates,
            });
          }
        },
      );
    } catch (error) {
      resolve({ coordinates: resCoordinates });
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
    return getLocation({
      latitude: parseFloat(swm[1]),
      longitude: parseFloat(swm[2]),
    }).then(res => {
      return res;
    });
  }
  return undefined;
};

module.exports = { getPostLocation };
