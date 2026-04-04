const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTP } = require("../utils/generateOTP");


// REGISTER USER
const register = async (req, res) => {
  const { name, phone, gender, role, password } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      gender,
      role,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// LOGIN USER
const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

const otpStore = {};

// SEND OTP
const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[phone] = otp;
  console.log("OTP is:", otp);


  await sendOTP(phone, otp); // utils function

  res.json({ success: true, message: "OTP sent" });
};

// VERIFY OTP
const verifyOtp = (req, res) => {
  let { phone, otp } = req.body;

  if (!phone.startsWith("+91")) {
    phone = "+91" + phone;
  }

  console.log("Stored OTP:", otpStore[phone]);
  console.log("Entered OTP:", otp);

  // ✅ FIX: convert both to string
  if (String(otpStore[phone]) === String(otp)) {
    delete otpStore[phone];
    return res.json({ success: true, message: "OTP verified" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
};

module.exports = { register, login, sendOtp, verifyOtp };