const categories = require('./categories');

const guessCategory = (breach) => {
  const { Description: description } = breach;

  for (const [name, { keywords }] of Object.entries(categories)) {
    if (!keywords) continue;

    for (const keyword of keywords) {
      if (description.indexOf(keyword) !== -1) {
        return name;
      }
    }
  }

  return 'other';
};

module.exports = guessCategory;
