const escapeString = string => {
  return JSON.stringify(
    string
      .replace(/\n/g, ' ')
      .replace(/\s\s/g, ' ')
      .replace(/^\s/g, ''),
  ).substring(1, JSON.stringify(string).length - 1);
};

module.exports = { escapeString };
