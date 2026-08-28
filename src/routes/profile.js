const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedinUser = req.user;
    console.log(loggedinUser);
    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));
    await loggedinUser.save();
    res.json({
      message: `${loggedinUser.firstName}, Your Profile updated successfully`,
      data: loggedinUser,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (typeof oldPassword !== "string" || typeof newPassword !== "string") {
      throw new Error("Invalid input");
    }
    const user = req.user;
    const isOldPasswordValid = await user.validatePassword(oldPassword);

    if (!isOldPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    if (newPassword === oldPassword) {
      throw new Error("New password must be different from the old one");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Please enter a strong password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

module.exports = profileRouter;
