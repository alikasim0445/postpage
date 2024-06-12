const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create indexes for efficient querying
LikeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
