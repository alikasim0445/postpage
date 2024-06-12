require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoute = require("./Route/blogRout.js");
const auth = require("./Route/auth.js");
const likeRoute = require("./Route/likeRout.js");
const commentRoute = require("./Route/commentRout.js");
const forgotRoute = require("./Route/forgotRout.js");
const cors = require("cors");
const resetRoute = require("./Route/restRoute.js");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.static("public"));

app.use("/api/blogs", blogRoute);
app.use("/api/user", auth);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/forgot-password", forgotRoute);
app.use("/api/reset-password", resetRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
