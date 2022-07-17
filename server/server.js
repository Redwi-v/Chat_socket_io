const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.json("hi");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(7777, () => {
  console.log("listening on *:7777");
});
