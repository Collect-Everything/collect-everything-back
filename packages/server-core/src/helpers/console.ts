export const redLog = (message: string) => {
  return `\x1b[31m${message}\x1b[0m`;
};

export const greenLog = (message: string) => {
  return `\x1b[32m${message}\x1b[0m`;
};

export const blueLog = (message: string) => {
  return `\x1b[34m${message}\x1b[0m`;
};

export const boldLog = (message: string) => {
  return `\x1b[1m${message}\x1b[0m`;
};

export const underlineLog = (message: string) => {
  return `\x1b[4m${message}\x1b[0m`;
};
