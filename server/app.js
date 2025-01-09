import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI);

const app = express();

app.use(express.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: true }));

//console.log(process.env.PORT);

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
