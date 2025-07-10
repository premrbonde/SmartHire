// database/dbConnection.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)          // removed dbName option
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("Failed to connect:", err));
};
export default dbConnection;
