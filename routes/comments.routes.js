const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Comment = require("../models/comments.model");
const Movie = require("../models/Movie.model");
const { isAuthenticated, isAdmin } = require("./../middleware/jwt.middleware");

router.post("/api/add-comment/:movieId", isAuthenticated, async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { text } = req.body;

    let createdComment = await Comment.create({
      addedBy: req.payload._id,
      text,
      movie: movieId,
    });

    createdComment = await Comment.findById(createdComment._id)
      .populate("movie")
      .populate("addedBy");

    await Movie.findByIdAndUpdate(movieId, {
      $push: { comments: createdComment._id },
    });
    res.status(200).json(createdComment);
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/allComments", async (req, res) => {
  try {
    const findComments = await Comment.find()
      .populate("movie")
      .populate("addedBy");

    res.status(200).json(findComments);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/comments/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const findComments = await Comment.find({ movie: movieId })
      .populate("movie")
      .populate("addedBy");

    res.status(200).json(findComments);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/topComments", async (req, res) => {
  try {
    const findComments = await Comment.find()
      .populate("movie")
      .populate("addedBy")
      .sort({ rating: 1 });

    console.log(findComments);
    res.status(200).json(findComments);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
