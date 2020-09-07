const express = require('express');
var forceSsl = require('force-ssl-heroku');
const app = express();

app.use(forceSsl);
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
});

app.listen(process.env.PORT || 4200);
