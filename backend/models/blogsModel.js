const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
