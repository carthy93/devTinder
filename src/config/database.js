const mongoose = require("mongoose");
const dbUrl = process.env.DB_CONNECTION_SECRET_KEY;

const connectDB = async () => {
  await mongoose.connect(dbUrl);
};

module.exports = connectDB;
