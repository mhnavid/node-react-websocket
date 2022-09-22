module.exports = {
  init: () => {
    const webSocketsServerPort = 8000;
    const webSocketServer = require("websocket").server;
    const http = require("http");
    // Spinning the http server and the websocket server.
    const server = http.createServer();
    server.listen(webSocketsServerPort);
    const wsServer = new webSocketServer({
      httpServer: server,
    });

    console.log("websocket server is listening on port", webSocketsServerPort);

    // Generates unique ID for every new connection
    const getUniqueID = () => {
      const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      return s4() + s4() + "-" + s4();
    };

    // I'm maintaining all active connections in this object
    const clients = {};

    const sendMessage = (json) => {
      // We are sending the current data to all connected clients
      Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
      });
    };

    wsServer.on("request", function (request) {
      var userID = getUniqueID();
      console.log(new Date() + " Received a new connection");
      // You can rewrite this part of the code to accept only the requests from allowed origin
      const connection = request.accept(null, request.origin);
      clients[userID] = connection;
      connection.on("message", function (message) {
        sendMessage(message.utf8Data);
      });
      // user disconnected
      connection.on("close", function (connection) {});
    });
  },
};
