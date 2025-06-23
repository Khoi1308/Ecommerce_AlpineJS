import * as dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing string environment variable for ${key}`);
  }

  return value;
};
// Enviroment
export const NODE_ENV = getEnv("NODE_ENV");
// Database
export const POSTGRES_HOST = getEnv("POSTGRES_HOST");
export const POSTGRES_PORT = getEnv("POSTGRES_PORT");
export const POSTGRES_USER = getEnv("POSTGRES_USER");
export const POSTGRES_DB = getEnv("POSTGRES_DB");
export const POSTGRES_PASSWORD = getEnv("POSTGRES_PASSWORD");

// Frontend
export const APP_ORIGIN = getEnv("APP_ORIGIN");

// JWT
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
// GMAIL API
export const CLIENT_ID = getEnv("CLIENT_ID");
export const CLIENT_SECRET = getEnv("CLIENT_SECRET");
export const REDIRECT_URI = getEnv("REDIRECT_URI");
export const GMAIL_TOKEN = getEnv("GMAIL_TOKEN");
export const GMAIL_REFRESH = getEnv("GMAIL_REFRESH");
