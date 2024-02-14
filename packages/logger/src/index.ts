import pino, { TransportTargetOptions } from "pino";

const LOG_PATH = process.env.LOG_PATH || "logs";

export const LOGGED_LEVELS = ["info", "warn", "error", "fatal"];

const targets: TransportTargetOptions[] = [
  {
    target: "pino/file",
    level: "info",
    options: { destination: `${LOG_PATH}/info.log`, mkdir: true },
  },
  {
    target: "pino/file",
    level: "error",
    options: { destination: `${LOG_PATH}/error.log`, mkdir: true },
  },
  {
    target: "pino/file",
    level: "warn",
    options: { destination: `${LOG_PATH}/warn.log`, mkdir: true },
  },
  {
    target: "pino/file",
    level: "fatal",
    options: { destination: `${LOG_PATH}/fatal.log`, mkdir: true },
  },
];
if (!process.env.NO_PRETTY_LOGS) {
  targets.push({ target: "pino-pretty", options: { colorize: true } });
}

export const loggerTransport = {
  targets,
};

export const logger = pino({
  transport: loggerTransport,
});
