import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { readFileSync } from 'fs';

export type VersionLog = { message: string; sha: string; version: string };
export type SimpleLog = Omit<VersionLog, 'version'>;

export const initGit = async (): Promise<SimpleGit> => {
  const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 1,
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

export const toVersionLog = async (
  git: SimpleGit,
  { message, sha }: SimpleLog
): Promise<VersionLog> => {
  await git.checkout(sha);
  const packageJson = readFileSync('package.json', 'utf-8');
  const { version } = JSON.parse(packageJson);

  return { message, sha, version };
};
