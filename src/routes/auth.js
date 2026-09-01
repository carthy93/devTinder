const express = require("express");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of the data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    // Create a JWT token
    const token = await savedUser.getJWT();

    // Add the token to cookie and send the response back to user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 1 * 36000000),
    });
    res
      .status(200)
      .json({ message: "User created successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (typeof emailId !== "string" || typeof password !== "string") {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error logging in the user" + ": " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).send("Logged out successfully");
});

module.exports = authRouter;
