const validTwitterUsername = /^@?(\w){1,15}$/;
const validFacebookUsername = /^[a-z\d.]{5,}$/i;
const validInstagramUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/;
const validPinterestUsername = /^[a-z\d._]{2,30}$/i;

module.exports = {
  validTwitterUsername,
  validFacebookUsername,
  validInstagramUsername,
  validPinterestUsername,
};
