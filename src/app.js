const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error finding the user: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching the feed: " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    console.log(updateUser);
    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("Error updating the user: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(400).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Error deleting the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
