const dayjs = require('dayjs');

const calculateScore = async ({
  votes,
  createdAt,
  allUsers,
  manualSmiles,
  location,
  oldEvaluation,
}) => {
  const daysSinceTfStart = dayjs(createdAt).diff(dayjs('2018-02-01'), 'days');
  let totalscore = daysSinceTfStart * 3;
  const smiles = [];
  let totalSmiles = 0;
  if (manualSmiles) {
    manualSmiles.forEach(({ value }) => {
      totalscore += value;
    });
  }
  const evaluation = oldEvaluation || {};
  const { score } = evaluation;
  if (score) totalscore += score * 150;
  const voteList = [];
  const tmpList = votes.split('\n');
  tmpList.forEach(v => {
    const vote = v.split(',');
    const voter = vote[0];
    const value = parseInt(vote[2]);
    voteList.push({ voter, value });
    if (allUsers.indexOf(voter) !== -1) {
      const smilesValue = Math.round(value / 1000);
      smiles.push({ voter, value: smilesValue });
      totalSmiles += smilesValue;
    }
  });
  let isTopPick = false;
  voteList.forEach(({ voter, value }) => {
    if (!score && voter === 'travelfeed') {
      totalscore += value;
      evaluation.score = Math.round(value / 150);
      if (value > 9000) isTopPick = true;
    } else if (voter === 'curie' && value > 500) {
      totalscore += value * 0.3;
    } else if (voter === 'c-squared') {
      totalscore += value * 0.05;
    } else if (voter === 'c-cubed') {
      totalscore += value * 0.1;
    } else if (voter === 'ocd') {
      totalscore += value * 0.4;
    } else if (voter === 'steemitworldmap' && value > 10000) {
      totalscore += value * 0.25;
    } else if (voter === 'curangel') {
      totalscore += value * 0.2;
    } else if (voter === 'gtg') {
      totalscore += value * 0.1;
    } else if (voter === 'blocktrades') {
      totalscore += value * 0.1;
    } else if (voter === 'theycallmedan') {
      totalscore += value * 0.1;
    }
    if (!evaluation.score) evaluation.score = 0;
    if (totalscore > 15000) isTopPick = true;
  });
  let countryScore = totalscore;
  let subdivisionScore = totalscore;
  if (
    location &&
    location.countryCode &&
    location.subdivision &&
    !location.city
  ) {
    subdivisionScore = totalscore + 5000;
  } else if (location && location.countryCode && !location.subdivision) {
    countryScore = totalscore + 5000;
  }
  return {
    score: totalscore,
    isTopPick,
    evaluation,
    smiles,
    totalSmiles,
    countryScore,
    subdivisionScore,
  };
};

module.exports = { calculateScore };
