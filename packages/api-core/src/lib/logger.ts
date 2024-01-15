import pino, { TransportTargetOptions } from "pino";

export const LOGGED_LEVELS = ["info", "warn", "error", "fatal"];

export const serviceLogger = (logFolderPath: string) => {
  const targets: TransportTargetOptions[] = [
    {
      target: "pino/file",
      level: "info",
      options: { destination: `${logFolderPath}/info.log`, mkdir: true },
    },
    {
      target: "pino/file",
      level: "error",
      options: { destination: `${logFolderPath}/error.log`, mkdir: true },
    },
    {
      target: "pino/file",
      level: "warn",
      options: { destination: `${logFolderPath}/warn.log`, mkdir: true },
    },
    {
      target: "pino/file",
      level: "fatal",
      options: { destination: `${logFolderPath}/fatal.log`, mkdir: true },
    },
  ];
  if (process.env.NODE_ENV !== "development") {
    targets.push({ target: "pino-pretty", options: { colorize: true } });
  }

  const loggerTransport = {
    targets,
  };

  return pino({
    transport: loggerTransport,
  });
};
