const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { content } = data;
    const match = content.match("orange");

    await axios.post("http://localhost:4005/events", {
      type: "CommentFiltered",
      data: {
        commentId: data.commentId,
        content: data.content,
        postId: data.postId,
        status: match ? "comment rejected" : "approved",
      },
    });
  }
  res.send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Filter listen in at port 4003");
});
