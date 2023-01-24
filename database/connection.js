const mongoose = require("mongoose");
const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", false);
    return await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
