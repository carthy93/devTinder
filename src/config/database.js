const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://caarthik180_db_user:jz4zfgThrMuHmRPv@namastenode.nouqehy.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(dbUrl);
};

module.exports = connectDB;
