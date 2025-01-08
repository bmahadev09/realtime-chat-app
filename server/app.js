import express from "express";
import userRoute from "./routes/userRoutes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (req, res) => {
  console.log("Server is running on port 3000");
});
