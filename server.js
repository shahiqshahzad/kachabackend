import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use((req, res) => {});

const PORT = process.env.PORT || 4500;
app.listen(PORT, console.log(`Server is Running on port ${process.env.PORT}`));
