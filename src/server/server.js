const projectData = {};

var path = require('path');
const test = require('./serverTest');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

console.log(__dirname);

// APIs base url 
const weatherUrl = `https://api.weatherbit.io/v2.0/history/daily?&lat=`;
const weatherApiKey = `&key=${process.env.weatherApiKey}`;
const pixbayUrl = 'https://pixabay.com/api/';
const pixKey = process.env.pixBayKey;


app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

app.get('/test', function (req, res) {
  res.send(test);
}); 

app.get('/all', function(req, res){
  res.send(projectData);
});

//post rute
app.post('/city', function (req, res) {
  projectData.location = req.body.location;
  projectData.country = req.body.country;
  projectData.latitude = req.body.latitude;
  projectData.longitude = req.body.longitude;
  projectData.daysleft = req.body.daysleft;
  projectData.startDate = req.body.startDate;
  projectData.endDate = req.body.endDate;
  console.log('Post recieved');
  res.end();
});

 // Weather API call

 app.get('/weather', async (req, res) => {
  let lat = projectData.latitude;
  let lon = projectData.longitude;
  let t0 = projectData.startDate;
  let start = new Date(t0);
  start.setFullYear(start.getFullYear()-1);
  start = start.toISOString();
  start = start.split("T")[0];
  let t1 = projectData.startDate;
  let end = new Date(t1);
  end.setFullYear(end.getFullYear()-1);
  end.setDate(end.getDate()+1);
  end = end.toISOString();
  end = end.split("T")[0];
  
  const apiUrl = `${weatherUrl}${lat}&lon=${lon}&start_date=${start}&end_date=${end}${weatherApiKey}`;
  const response = await fetch(apiUrl);
    try {
      const data = await response.json();
      res.send(data);
      console.log(data);
  } catch(error) {
      console.log('error', error);
    }
});

// Img API call 

app.get('/img', async (req, res) => {
  let location = projectData.location;
  console.log(location);
  const ourUrl = `${pixbayUrl}?key=${pixKey}&q=${location}&image_type=photo`;
  const response = await fetch(ourUrl);
    try {
      const data = await response.json();
      res.send(data);
  } catch(error) {
      console.log('error', error);
      }
});


module.exports = app;