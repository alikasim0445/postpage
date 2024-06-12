const Comment = require("../models/Comment");

const commentPost = async (req, res) => {
  try {
    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.user._id,
      content: req.body.content,
    });
    await newComment.save();

    res.status(200).json({ message: "Comment posted successfully" });
  } catch (error) {
    console.error("Error posting comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  commentPost,
};
