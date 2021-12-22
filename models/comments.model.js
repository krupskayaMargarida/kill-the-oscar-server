const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    movie: { type: Schema.Types.ObjectId, ref: "Movie" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
