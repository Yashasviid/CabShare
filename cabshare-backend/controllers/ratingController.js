const Rating = require("../models/Rating");
const User   = require("../models/User");
const Ride   = require("../models/Ride");

// POST /api/ratings/submit
exports.submitRating = async (req, res) => {
  try {
    const { rideId, ratedUserId, rating, review } = req.body;
    const raterId = req.user.id;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (ride.status !== "completed")
      return res.status(400).json({ message: "Can only rate completed rides" });

    const raterRole = ride.driverId?.toString() === raterId ? "driver" : "passenger";

    const newRating = await Rating.create({
      rideId, raterId, ratedUserId, rating, review, raterRole,
    });

    // Recalculate average for the rated user
    const all = await Rating.find({ ratedUserId });
    const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;

    await User.findByIdAndUpdate(ratedUserId, {
      averageRating: Math.round(avg * 10) / 10,
      totalRatings:  all.length,
    }, { returnDocument: "after" });

    res.status(201).json(newRating);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "You already rated this ride" });
    res.status(500).json({ message: err.message });
  }
};

// GET /api/ratings/ride/:rideId/hasRated
exports.hasRated = async (req, res) => {
  try {
    const existing = await Rating.findOne({
      rideId: req.params.rideId,
      raterId: req.user.id,
    });
    res.json({ hasRated: !!existing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/ratings/user/:userId
exports.getUserRating = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("averageRating totalRatings name");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};