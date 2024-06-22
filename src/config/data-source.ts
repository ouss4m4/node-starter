import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "sampledb",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["../infra/db/migrations/**"],
  subscribers: [],
});
