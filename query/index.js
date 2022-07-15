const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const eventHelper = (type, data) => {
  if (type === "PostCreated") {
    const { id, post } = data;
    posts[id] = { id, post, comments: [] };
  }

  if (type === "CommentCreated") {
    const { commentId, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ commentId, content, status });
  }

  if (type === "CommentUpdated") {
    const { commentId, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find(
      (comment) => comment.commentId === commentId
    );
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(`Event : ${type}`);

  eventHelper(type, data);

  res.send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("listening on port 4002");

  const res = await axios.get("http://localhost:4005/events");

  console.log("Loading previous Events");

  for (let event of res.data) {
    // const element = array[event];
    console.log(event.type);
    // events.data.forEach((event) => {
    //   console.log(`event:${event.type}`);
    eventHelper(event.type, event.data);
    // });
  }
});
