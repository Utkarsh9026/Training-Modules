import usersModels from "../models/users.models.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  let { name, email, password, role } = req.body;
  try {
    let user = await usersModels.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new usersModels({
      name,
      email,
      password,
      role,
    });

    await user.save();

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(201).json({ token });
  } catch (ex) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await usersModels.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
