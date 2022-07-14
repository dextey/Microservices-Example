const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events/", (req, res) => {
  const event = req.body;
  console.log(event);
  axios
    .post("http://localhost:4000/events", event)
    .catch((error) => console.log("error 1"));
  axios
    .post("http://localhost:4001/events", event)
    .catch((error) => console.log("error 2"));
  axios
    .post("http://localhost:4002/events", event)
    .catch((error) => console.log("error 3"));
  axios
    .post("http://localhost:4003/events", event)
    .catch((error) => console.log("error 4"));

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("EventBus listening at port 4005");
});
