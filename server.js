import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("hy");
});
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  next(error);
});
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, console.log(`Server is Running on port ${process.env.PORT}`));
