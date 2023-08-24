import { VersionLog } from './git';
import chalk from 'chalk';

const MSG_FORMAT = (msg: string) => chalk.bold.bgCyan(msg);
const VERSION_FORMAT = (msg: string) => chalk.bold.bgGreen(msg);

export const formatVersionLog = (logs: VersionLog[]): string[][] =>
  logs.reduce(
    (acc, { version, message }) => [...acc, [message, `Version: ${version}`]],
    [] as string[][]
  );

export const prettyPrint = (toPrint: string[][]) => {
  toPrint.forEach(([message, version]) => {
    console.log(MSG_FORMAT(message));
    console.log(VERSION_FORMAT(version));
    console.log();
  });
};
