import { VersionLog } from './git';

export const formatVersionLog = (logs: VersionLog[]) =>
  logs.reduce((acc, { version, message }) => {
    const versionLog = `Message: ${message}\nVersion: ${version}\n\n`;
    return acc + versionLog;
  }, '');
