import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const jwt = require("jsonwebtoken");
const secret_key_token = process.env.TOKEN_SECRET;

export function GenerateToken(email: String) {
  const token = jwt.sign({ email }, secret_key_token, {
    expiresIn: "7d",
  });
  return token;
}

export function VerifyToken(initialToken: String, email: String) {
  try {
    const token = initialToken.split(" ")[1];
    const verifiedToken = jwt.verify(token, secret_key_token);
    return verifiedToken.email == email;
  } catch (error) {
    return false;
  }
}
