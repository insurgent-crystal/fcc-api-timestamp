// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

// yea, this regexp does the check
const containsExactlyOneInteger = str => /^-?\d+$/.test(str);

// handle no params
app.get("/api/timestamp/", (req, res) => {
  const date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// that was pretty easy
app.get("/api/timestamp/:date_string", (req, res) => {
  const date = containsExactlyOneInteger(req.params.date_string) ?
               // new Date(parseInt(req.params.date_string) * 1000) : //in case of sec timestamp
               new Date(parseInt(req.params.date_string)) :
               new Date(req.params.date_string);
  if (date === 'Invalid Date') {
    res.json({unix: null, utc: "Invalid Date" });
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  };
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});