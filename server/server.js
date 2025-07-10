import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/db.js"; 
import cookieParser from "cookie-parser";

// Routes
import userRouter from "./route/userRouter.js";
import productRouter from "./route/admin/productRouter.js"
import productFilterRouter from "./route/shop/productFilterRouter.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const DATABASE = process.env.DATABASE_URL;

app.use(cors({
  origin: "http://localhost:5173", // adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma'
  ],
  credentials: true
}));

app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter); // ✅ register new admin/product route
app.use('/api/shop', productFilterRouter); // ✅ register new admin/product route

connectDB(DATABASE);

// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
