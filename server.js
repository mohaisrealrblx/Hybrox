const express = require('express');
const server = express();
  
server.all('/', (req, res) => {
  res.send(`Hybeox Main Module is running!`)
})

function keepAlive() {
  server.listen(8080, () => { console.log("Server is Ready!!" + Date.now()) });
}
  
module.exports = keepAlive;