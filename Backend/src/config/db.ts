import { DataSource } from "typeorm";
import path from "path";
import {
  NODE_ENV,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "./env";

export const AppData = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  entities: [
    path.join(__dirname, "../modules/**/entities/*entity.{ts, js}"),
    path.join(__dirname, "../modules/**/*.entity.{ts, js}"),
  ],
  // synchronize: true,
  logging: NODE_ENV === "development",
  migrations: [path.join(__dirname, "../../migrations/*.{ts,js}")],
});

export const connectDB = async () => {
  try {
    await AppData.initialize();
    console.log("Successfully connect to DB");
  } catch (error) {
    console.log("Could not connect DB: ", error);
    process.exit(1);
  }
};
