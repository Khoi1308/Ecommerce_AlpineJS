import * as dotenv from "dotenv";
dotenv.config();
const proc_env = process.env;

// Enviroment
export const NODE_ENV = proc_env.NODE_ENV;
// Database
export const POSTGRES_HOST = proc_env.POSTGRES_HOST;
export const POSTGRES_PORT = proc_env.POSTGRES_PORT;
export const POSTGRES_USER = proc_env.POSTGRES_USER;
export const POSTGRES_DB = proc_env.POSTGRES_DB;
export const POSTGRES_PASSWORD = proc_env.POSTGRES_PASSWORD;

// Frontend
export const APP_ORIGIN = proc_env.APP_ORIGIN;
