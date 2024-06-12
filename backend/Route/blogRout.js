const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  upload,
} = require("../controller/blogController");

const router = express.Router();

router.get("/", getAllBlogs);

router.get("/:id", getBlog);

router.post("/", upload.single("file"), createBlog);

router.put("/:id", upload.single("file"), updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;
