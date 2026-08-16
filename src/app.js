const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" });
});

app.post("/user", (req, res) => {
  //save data to db
  res.send("Data has been saved to the database");
});

app.delete("/user", (req, res) => {
  //delete data from db
  res.send("Data has been deleted from the database");
});

app.put("/user", (req, res) => {
  //update data in db
  res.send("Data has been updated in the database");
});

app.patch("/user", (req, res) => {
  //update data in db
  res.send("Data has been updated in the database");
});

// app.use("/test", (req, res) => {
//   res.send("Hello from the Test route!");
// });

// app.use("/", (req, res) => {
//   res.send("Hello from the dashboard!");
// });

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
