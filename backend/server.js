import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js"
// import cors from "cors"; // Import CORS

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// app.use(cors({
//     origin: "http://localhost:3000", // Replace with the URL of your frontend
//     credentials: true // Allow credentials like cookies, authorization headers, etc.
//   }));

app.use(express.json()); //a middleware to parse the incoming request with JSON payloads(from req.body)
app.use(cookieParser()); //middleware useful in protectRoute useful for token
app.use("/api/auth",authRoutes);//a middleware for routes
app.use("/api/messages",messageRoutes);//middleware for message
app.use("/api/users",userRoutes);
// app.get("/",(req,res)=>{
//     //root route http://localhost:8000/
//     res.send("Hello World!!!!!");

// });

server.listen(PORT, ()=> { 
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});