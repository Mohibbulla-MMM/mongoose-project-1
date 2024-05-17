import dotenv from "dotenv";
import path from "path";

const envFilePath = path.join(process.cwd(), ".env");
dotenv.config({ path: envFilePath });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};