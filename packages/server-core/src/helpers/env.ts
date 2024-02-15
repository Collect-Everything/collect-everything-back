import { Gateway, Service } from "../config";

export const getPortFromEnv = (service: Service | Gateway): number => {
  const port = process.env[service + "_PORT"];
  if (!port) {
    throw new Error(`Port for service ${service} is not defined in env file.`);
  }
  return parseInt(port);
};
