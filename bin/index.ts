#!/usr/bin/env npx ts-node --esm

import { prettyPrint } from '../lib/formatting';
import { initGit, getLastNCommits, toVersionLog, VersionLog } from '../lib/git';
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
    const startingBranch = (await git.branch()).current;
    const lastNCommits = await getLastNCommits(git, options.number);

    const versionLogs: VersionLog[] = [];

    for (const simpleLog of lastNCommits) {
      const versionLog = await toVersionLog(git, simpleLog);
      versionLogs.push(versionLog);
    }

    if (startingBranch) await git.checkout(startingBranch);
    prettyPrint(versionLogs);
  });

program.parse();
