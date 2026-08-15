const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello from the dashboard!");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the Hello route!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the Test route!");
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
