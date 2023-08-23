import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';

export type SimpleLog = { message: string; sha: string };

export const initGit = async (): Promise<SimpleGit> => {
  const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
  };

  const git = simpleGit(options);
  return git;
};

export const getLastNCommits = async (
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
