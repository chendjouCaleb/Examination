const express = require("express");
const fs = require("fs");

const app = express();

const port = 9100;

app.use("/", express.static("./dist/Examination"));
app.use( (request, response) => {
  response.sendFile(__dirname + '/dist/Examination/index.html');
});

app.listen(port,  () => console.log("HTTP Server running on port " + port));
