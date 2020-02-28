const readingTime = require('reading-time');
const sanitize = require('sanitize-html');
const { parseBody } = require('./parseBody');
const { isSpam } = require('./helpers/isSpam');

const processBody = body => {
  const htmlBody = parseBody(body, {});
  const sanitized = sanitize(htmlBody, { allowedTags: [] });
  const readtime = readingTime(sanitized);
  const { minutes, words } = readtime;
  const excerpt = sanitized.substring(0, 350);
  const isSpamComment = isSpam(sanitized);
  return {
    body: htmlBody,
    wordCount: words,
    readTime: minutes,
    excerpt,
    isSpamComment,
  };
};

module.exports = {
  processBody,
};
