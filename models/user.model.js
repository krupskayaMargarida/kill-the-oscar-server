const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dvhtrwoc7/image/upload/v1639697476/movie-gallery/ekfvrdsdgtypth2lwkc6.jpg",
    },
    watchedMovie: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    favorite: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    toWatch: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  },
  {
    timestamps: true,
  }
);
module.exports = model("User", userSchema);
