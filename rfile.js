var longPolling = require("rbxwebhook.js");
var server = new longPolling();

server.on("connection", conn => {
  console.log(`New connection (id: ${conn.id})`);

  conn.on("ping", message => {
    console.log(`echo: ${message}`);
    conn.send("pong", message);
  });

  conn.on("broadcast", message => {
    console.log(`broadcast: ${message}`);
    server.broadcast("broadcast", message);
  });

  conn.on("disconnect", () => {
    console.log(`${conn.id} disconnected`);
  });
});

module.exports = server.router;