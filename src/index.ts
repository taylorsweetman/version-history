import { initGit, getLastNCommits } from './git';

const MAX_COUNT = 2;

const main = async () => {
  console.log('--- Starting ---');
  const git = await initGit();

  const lastNCommits = await getLastNCommits(git, MAX_COUNT);
  console.log(lastNCommits);
  console.log('--- Complete ---');
};

main();
