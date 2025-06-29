// db.js
import mongoose from "mongoose";
export const connectDB = async (url) => {
    try {
        const DB_Options = {
            dbname: "Ecommerce"
        };
        await mongoose.connect(url, DB_Options);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("Error while connecting to DB:", error);
    }
};
