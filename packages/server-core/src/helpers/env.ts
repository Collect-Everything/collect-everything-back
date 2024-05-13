import { Gateway, Service } from "../config";

export const getPortFromEnv = (service: Service | Gateway): number => {
  if (process.env.NODE_ENV === "test") {
    return 0;
  }
  const port = process.env[service + "_PORT"];
  if (!port) {
    throw new Error(
      `Port for service ${service} is not defined in env file. Please add ${service}_PORT to your env file.`,
    );
  }
  return parseInt(port);
};
