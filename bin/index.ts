#!/usr/bin/env npx ts-node --esm

import { initGit, getLastNCommits, getVersionLog } from '../lib/git';
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
    console.log('--- Starting ---');
    const git = await initGit();
    const lastNCommits = await getLastNCommits(git, options.number);
    const startingCommit = lastNCommits[0].sha;

    const versionPromises = lastNCommits.map((commit) =>
      getVersionLog(git, commit)
    );

    const result = await Promise.all(versionPromises);

    console.log(result);
    await git.checkout(startingCommit);
    console.log('--- Complete ---');
  });

program.parse();
