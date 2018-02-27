const inquirer = require('inquirer');

const categories = require('./categories');
const guessCategory = require('./guessCategory');

const askToIdentifyBreach = async (breach) => {
  const message = `
Found unidentified breach "${breach.Name}"

Description:
${breach.Description}

Under which category should this service be listed?
  `.trim();
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'q',
      message,
      choices: Object.keys(categories),
      default: guessCategory(breach),
    },
  ]);

  return answer.q;
};

module.exports = askToIdentifyBreach;
