const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { post } = req.body;
  posts[id] = { id, post };

  await axios.post("http://eventbus-service:4005/events", {
    type: "PostCreated",
    data: { id, post },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(`Event : ${type}`);

  res.status(200).send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
