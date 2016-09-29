const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.end('Hello World');
});

app.listen(process.env.PORT || 3000);
