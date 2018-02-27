const inquirer = require('inquirer');

const askForEmail = async () => {
  const message = `
Enter an email address to profile:
  `.trim();
  const answer = await inquirer.prompt([
    {
      name: 'q',
      message,
    },
  ]);

  return answer.q;
};

module.exports = askForEmail;
