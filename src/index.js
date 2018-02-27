const fse = require('fs-extra');
const fetch = require('node-fetch');

const askToIdentifyBreach = require('./askToIdentifyBreach');
const askForEmail = require('./askForEmail');

const hibpFetch = async (path) => (await fetch(`https://haveibeenpwned.com/api/v2/${path}`)).json();

const main = async () => {
  const breachCategories = new Map(JSON.parse(await fse.readFile('./breachCategories.json', 'utf-8')));

  const breaches = await hibpFetch('breaches');

  // Make sure all breaches are identified
  for (const breach of breaches) {
    const { Name: name } = breach;

    if (!breachCategories.has(name)) {
      const category = await askToIdentifyBreach(breach);
      breachCategories.set(name, category);
      await fse.writeFile(
        './breachCategories.json',
        JSON.stringify([...breachCategories], null, '  '),
      );
    }
  }

  // Get user breaches
  const email = await askForEmail();
  const userBreaches = await hibpFetch(`breachedaccount/${email}`);

  // Build profile
  const profile = {};

  for (const userBreach of userBreaches) {
    const category = breachCategories.get(userBreach.Name);

    profile[category] = profile[category] ? profile[category] + 1 : 1;
  }

  console.log('Profile:');

  for (const [category, count] of Object.entries(profile)) {
    console.log(`${category}: ${Math.round(100 * count / userBreaches.length)}%`);
  }
};

main();
