const axios = require("axios");

// generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// send OTP via Fast2SMS
const sendOTP = async (phone, otp) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q", // ✅ working route
        message: `Your CabShare OTP is ${otp}`,
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS sent:", response.data);
  } catch (error) {
    console.error("OTP error:", error.response?.data || error.message);
  }
};

module.exports = { generateOTP, sendOTP };