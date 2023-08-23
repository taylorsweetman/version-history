import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';

type SimpleLog = { message: string; sha: string };

const MAX_COUNT = 2;

const initGit = async (): Promise<SimpleGit> => {
  const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
  };

  const git = simpleGit(options);
  return git;
};

const getLastNCommits = async (
  git: SimpleGit,
  n: number
): Promise<SimpleLog[]> => {
  const { all } = await git.log({
    maxCount: n,
  });

  const simpleLogs = all.map(({ message, hash }) => ({
    message,
    sha: hash,
  }));

  return simpleLogs;
};

const main = async () => {
  console.log('--- Starting ---');
  const git = await initGit();

  const lastNCommits = await getLastNCommits(git, MAX_COUNT);
  console.log(lastNCommits);
  console.log('--- Complete ---');
};

main();
