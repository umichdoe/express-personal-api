
// require express and other modules
const express = require('express');
var app = express();
const mongoose = require('mongoose');
const Hackathon = require('./models/hackathon');
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());



// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
* DATABASE *
************/

var db = require('./models');

/**********
* ROUTES *
**********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
* HTML Endpoints
*/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
* JSON API Endpoints
*/


//Read -- Get all the hackathon lanugages
app.get("/api/hackathons", function index(req, res){
  Hackathon.find({}, function(err, hackathons){
    res.send(hackathons);
  });
})

//Create -- tested and working
app.post("/api/hackathons", function create(req, res, next){
  Hackathon.create(req.body).then(function(hackathon) {
    res.send(hackathon);
  });
});

//Delete -- tested and working
app.delete("/api/hackathons/:id", function destroy(req, res, next){
  Hackathon.findByIdAndRemove({_id: req.params.id}).then(function (hackathon) {
    res.send(hackathon);
  });
});

//Update -- tested and working
app.put("/api/hackathons/:id", function update(req, res, next){
  Hackathon.findByIdAndUpdate({_id: req.params.id}, req.body).then(function (hackathon) {
    Hackathon.findOne({_id: req.params.id}).then(function (hackathon) {
      res.send(hackathon);
    });
  });
});

console.log(__dirname);
console.log(__filename);

// Profile
app.get('/api/profile', function profile(req, res, next) {
  res.json({
    name: "John Ko",
    githubUsername: "umichdoe",
    githubLink: "https://github.com/umichdoe/",
    personalSiteLink: "https://umichdoe.github.io/",
    currentCity: "San Francisco",
    favoriteFoods: [
      { name: 'pizza', origin: 'Italy' },
      { name: 'ramen', origin: 'China' },
      { name: 'sushi', origin: 'Japan' },
      { name: 'french fries', origin: 'Belgium' },
      { name: 'burgers', origin: 'Germany' }
    ]
  });
});

app.get('/api', function apiIndex(req, res, next) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    name: "John Ko",
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/umichdoe/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://sheltered-ravine-19400.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"}, // DONE #1
      {method: "GET", path: "/api/profile", description: "A little about me"}, // DONE #2 PROFILE
      {method: "GET", path: "/api/hackathons", description: "Index of all the popular languages used at hackathons"}, // DONE #3
      {method: "POST", path: "/api/hackathons", description: "Create or add a new hackathon language"}, // DONE #4
      {method: "PUT", path: "/api/hackathons/:id", description: "Edit a hackathon language and update it."}, //  DONE #5
      {method: "DELETE", path: "/api/hackathons/:id", description: "Destroy a hackathon language"} // #6
    ]
  })
});

/**********
* SERVER *
**********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000);
