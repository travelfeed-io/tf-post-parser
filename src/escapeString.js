const escapeString = string => {
  return string
    .replace(/\n/g, ' ')
    .replace(/\s\s/g, ' ')
    .replace(/^\s/, '')
    .replace(/\s[^\s]*$/, '')
    .replace(/'/g, '’')
    .replace(/"/g, '”');
};

module.exports = { escapeString };
