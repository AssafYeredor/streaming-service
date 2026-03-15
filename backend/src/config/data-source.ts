import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Hamal } from "../entities/Hamal";
import * as dotenv from "dotenv";

dotenv.config();

import { Segment } from "../entities/Segmant";

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as "postgres") || "postgres", 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Segment],
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});
// import { DataSource } from "typeorm";
// import { Segment } from "../entity/Segment"; 

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "your_password",
//     database: "video_db",
//     synchronize: true,
//     logging: false,
//     entities: [Segment], 
// });