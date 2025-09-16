import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/*

; (async () => {
    try {
        await mongoose.connect(`{process.env.MONGO_URI}/${DB_NAME}`);
        // professional-setup event listeners
        app.on("error", (err) => {
            console.error("Server error:", err);
            throw err;
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
    }
})()

*/


const dbConnect = async () => {
    try {
        const connection_instance =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Connected to the database successfully , DB HOST: ${connection_instance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to the mongodb database", error);
        process.exit(1);
    }
}


export default dbConnect;