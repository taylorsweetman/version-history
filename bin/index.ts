#!/usr/bin/env npx ts-node --esm

import { formatVersionLog, prettyPrint } from '../lib/formatting';
import {
  initGit,
  getLastNCommits,
  getVersionLog,
  VersionLog,
} from '../lib/git';
import { Command } from 'commander';

const program = new Command();

program
  .name('version-history')
  .description('Get the version history of a Node repository');

program
  .command('check')
  .description('Check the version history of the repo')
  .option('-n, --number <int>', 'number of commits to include')
  .action(async (options) => {
    const git = await initGit();
    const currentBranch = (await git.branch()).current;
    const lastNCommits = await getLastNCommits(git, options.number);

    const result: VersionLog[] = [];

    for (const commit of lastNCommits) {
      const versionLog = await getVersionLog(git, commit);
      result.push(versionLog);
    }

    if (currentBranch) await git.checkout(currentBranch);
    prettyPrint(formatVersionLog(result));
  });

program.parse();
