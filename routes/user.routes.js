const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// GET /api/users/current  - Get current user info
router.get("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id)
    .populate("watchedMovie")
    .populate("toWatch");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/api/users/:userId", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.
    const userId = req.params.userId;
    const user = await User.findById(userId)
    .populate("watchedMovie")
    .populate("toWatch");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, name, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name, image },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/add-favorite  - Add favorite movie
router.put(
  "/api/users/add-favorite",
  isAuthenticated,
  async (req, res, next) => {
    try {
      // If the user is authenticated we can access the JWT payload via req.payload
      // req.payload holds the user info that was encoded in JWT during login.

      const currentUser = req.payload;
      const { movieId } = req.body;

      const updatedUser = await User.findByIdAndUpdate(currentUser._id, {
        $push: { favorite: movieId },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/users/wishlist
router.put("/api/users/wishlist", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.
    const currentUser = req.payload;
    const { movieId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(currentUser._id, 
      { $push: { toWatch: movieId } });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/watched-movie
router.put(
  "/api/users/watched-movie",
  isAuthenticated,
  async (req, res, next) => {
    try {
      // If the user is authenticated we can access the JWT payload via req.payload
      // req.payload holds the user info that was encoded in JWT during login.

      const currentUser = req.payload;
      const { movieId } = req.body;

      const updatedUser = await User.findByIdAndUpdate(currentUser._id, {
        $push: { watchedMovie: movieId },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
