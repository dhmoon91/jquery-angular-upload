var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('*', function (req,res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log("App listening on port" + port);
