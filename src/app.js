const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// handle auth for all get, delete, and update requests
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res, next) => {
  // Logic of getting user data
  res.send("User data fetched successfully");
});

app.get("/admin/getAlldata", (req, res, next) => {
  // Logic of checking if the request is authenticated or not
  res.send("All data fetched successfully");
});

app.get("/admin/deleteUser", (req, res, next) => {
  // Logic of deleting a user
  res.send("User deleted successfully");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
