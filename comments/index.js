const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());

commentsBypostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsBypostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsBypostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsBypostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event: " + type);
  if (type === "CommentFiltered") {
    const { commentId, content, postId, status } = data;

    const comments = commentsBypostId[postId];

    const comment = comments.find((comment) => comment.id === commentId);
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: { commentId, content, postId, status },
    });
  }

  res.status(200).send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("Listening at Port 4001");
});
