import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';

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

const main = async () => {
  console.log('--- Starting ---');
  const git = await initGit();
  const { all } = await git.log();

  const simpleLog = all.map((log) => log.message);
  console.log(simpleLog);
};

main();
