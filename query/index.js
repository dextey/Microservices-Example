const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  console.log(posts);
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, post } = data;
    posts[id] = { id, post, comments: [] };
  }

  if (type === "CommentCreated") {
    const { commentId, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ commentId, content });
  }

  res.send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("listening on port 4002");
});
