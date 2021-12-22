const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/Movie.model");
const fileUploader = require("../config/cloudinary.config");

router.post(
  "/api/upload",
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    // Get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
    console.log("PATH", req.file.path);
    res.json({ secure_url: req.file.path });
  }
);

// POST /api/movies - Create a new Movie
router.post("/api/movies", async (req, res, next) => {
  try {
    // Get the data from the request body
    console.log(req.body);
    const { title, director, rating, year, genre, img, description } = req.body;

    // Save the data in the db
    const createdMovie = await Movie.create({
      title,
      director,
      rating: Number(rating),
      year: Number(year),
      genre,
      img,
      description,
    });

    res.status(201).json(createdMovie); // 201 Created
  } catch (error) {
    res.status(500).json(error); // Internal Server Error
  }
});

// GET /api/movies - Get all existing movies
router.get("/api/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();

    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/movies/:movieId  - Get a specific movie
router.get("/api/movies/:movieId", async (req, res, next) => {
  try {
    // Get the project id from the URL
    const { movieId } = req.params; //   in Express `:` means `req.params`

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneMovie = await Movie.findById(movieId).populate("comments");

    // Send the response
    res.status(200).json(oneMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// PUT  /api/movies/:movieId  - Update a specific movie
router.put("/api/movies/:movieId", async (req, res, next) => {
  try {
    // Get the project id
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Values to use for updating the movie
    const { title, director, rating, year, genre, img, description } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { title, director, rating, year, genre, img, description },
      { new: true }
    );

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE /api/movies/:movieId  - Delete a specific movie
router.delete("/api/movies/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    await Movie.findByIdAndDelete(movieId);

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
