const escapeString = string => {
  const cleanString = string
    .replace(/\n/g, ' ')
    .replace(/\s\s/g, ' ')
    .replace(/^\s/, '')
    .replace(/\s[^\s]*$/, '');
  return JSON.stringify(cleanString).substring(
    1,
    JSON.stringify(cleanString).length - 1,
  );
};

module.exports = { escapeString };
