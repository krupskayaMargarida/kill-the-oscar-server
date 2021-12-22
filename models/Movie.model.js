const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  img: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
