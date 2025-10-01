import { GraphQLError } from "graphql";
import Cryptr from "cryptr";

/**
 * Use environment variable for secret key, fallback to a default for dev.
 */
const SECRET_KEY = process.env.ENCRYPTION_SECRET || "myTotallySecretKey";

const cryptr = new Cryptr(SECRET_KEY, {
  encoding: "base64",
  pbkdf2Iterations: 10,
  saltLength: 5,
});

/**
 * Encrypts a string or object into a secure token.
 * @param data - The data to encrypt.
 * @returns The encrypted token as a string.
 */
const encryptToken = (data: string | object | undefined): string => {
  const payload = typeof data === "string" ? data : JSON.stringify(data);
  return cryptr.encrypt(payload);
};

/**
 * Decrypts a token and parses it as JSON.
 * @param token - The encrypted token.
 * @returns The decrypted data, or null if decryption fails.
 */
const decryptToken = (token: string | undefined | null): any | null => {
  if (!token) return null;
  try {
    const decrypted = cryptr.decrypt(token);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    // Optionally, throw a GraphQLError instead of returning null:
    // throw new GraphQLError("Invalid or expired token");
    return null;
  }
};

export { encryptToken, decryptToken };
