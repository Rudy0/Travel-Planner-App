var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.post("/data", function(req, res) {
	var textapi = new aylien({
        application_id: process.env.API_ID,
        application_key: process.env.API_KEY
        });
        textapi.sentiment({
            'text': req.body.text
          }, function(error, response) {
            if (error === null) {
                res.send(response);
            }
          }); 
});

module.exports = app;