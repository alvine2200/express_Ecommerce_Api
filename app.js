require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routers/UserRouter");
const connectDB = require("./database/connection");
const rateLimit = require("express-rate-limiter");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const auth = require("./middlewares/AuthController");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(express.static("/public"));
app.use(express.json());  

app.use("/api/v1", userRouter);

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
