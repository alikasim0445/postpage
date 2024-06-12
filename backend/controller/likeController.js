const Like = require("../models/Like");

const likePost = async (req, res) => {
  const { postId } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(400).json({ error: "User not authenticated" });
  }

  const userId = req.user._id;

  try {
    // Check if the postId is valid (assuming postId is an ObjectId)
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ error: "Post already liked" });
    }

    // Create a new like
    const newLike = await Like.create({ postId, userId });

    res.status(200).json({ message: "Post liked successfully", like: newLike });
  } catch (error) {
    console.error("Error liking post: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { likePost };
