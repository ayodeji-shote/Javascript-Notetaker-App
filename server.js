// Prerequesites for express.js 
const express = require('express');
const path = require('path');
const app = express();

app.use("/static", express.static(path.resolve(__dirname,"src","static")));
// Gets the index.html located in the source folder specifiing the specific path for it to pick
app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname,"src","index.html"));
});
// Message that displays when the server is successfully running 
app.listen(process.env.port || 3000, ()=> console.log("server is running ")) 