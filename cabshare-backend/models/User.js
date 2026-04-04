const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, required: true, unique: true },
    gender: String,
    role: {
      type: String,
      enum: ["driver", "passenger"],
    },
    rating: { type: Number, default: 0 },
    averageRating: { type: Number, default: 5 },
    totalRatings:  { type: Number, default: 5 },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    vehicleModel:  { type: String, default: "" },
    vehicleColor:  { type: String, default: "" },
    vehicleNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);