const express = require("express");
const app = express();

app.get("/getUserData", (req, res, next) => {
  // Logic of DB call and fetching user data
  // what if there is some error in DB call
  try {
    throw new Error("Database connection failed");
    res.send("User data fetched successfully");
  } catch (error) {
    {
      res.status(500).send("Something wrong. Contact admin");
    }
    throw new Error("Database connection failed");
    res.send("User data fetched successfully");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
