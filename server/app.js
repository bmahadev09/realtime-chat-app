import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import chatRoute from "./routes/chatRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const adminSecretKey =
  process.env.ADMIN_SECRET_KEY || "ufehgdkhfvjkmmithudhgfodgj";

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: true }));

//console.log(process.env.PORT);

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port} in ${envMode} Mode`);
});

export { adminSecretKey, envMode };
