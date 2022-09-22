const express = require("express");
const logger = require("morgan");
const cors = require("cors");
var WebSocketClient = require("websocket").client;

const app = express();
const port = 7000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

var client = new WebSocketClient();

sendMessageInWebsocket = (message) => {
  client.on("connect", function (connection) {
    function sendMessage() {
      if (connection.connected) {
        connection.sendUTF(JSON.stringify(message));
      }
    }
    sendMessage();
  });

  client.connect("ws://localhost:8000/");
};

app.post("/send-msg", (req, res) => {
  let messageSocket = {
    message: req.body.message,
  };
  sendMessageInWebsocket(messageSocket);
  res.status(200).json({ message: "Message sent successfully" });
});

app.listen(port, () => {
  console.log(`Backend app is listening on port ${port}`);
});

// websocket
require("./websocket").init();
