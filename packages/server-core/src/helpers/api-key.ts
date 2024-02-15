import crypto from "crypto";

export const createGatewayApiKey = (data: string, secret: string) => {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
};
