import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const DB_NAME = "Indigo";
const PASSWORD = process.env.PASSWORD;
const EMAIL = process.env.EMAIL;
const SERVICE = process.env.SERVICE;
const USERID = process.env.USERID;
export { DB_NAME, EMAIL, PASSWORD, SERVICE, USERID };