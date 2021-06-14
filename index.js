'use strict'

const exphbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");
const data = require('./data.js');
const cors = require('cors');
const Speaker = require("./models/speaker");

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.engine("handlebars", exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

// send content of 'home' view
app.get('/', (req,res, next) => {
  Speaker.find({}).lean()
  .then((speakers) => {

  res.render('home', {speakers: JSON.stringify(speakers)});
  })
  });
 
 // send plain text response
 app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
 });

 // send content of 'home' view
app.get('/get', (req,res) => {
  //let result = data.getItem(req.query.name);
  // return a single record
  Speaker.findOne({"name": req.query.name }).lean()
  .then((result) => {
      console.log(result);
  res.render('details', {name: req.query.name, result: result });
  })
  .catch(err => next(err));

  
 });

 // define 404 handler
 app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
 });

app.listen(app.get('port'), () => {
  console.log('Express started');
 });


//  app.get('/api/speaker', (req,res) => {
//   const speaker = speaker.getAll(); // return all speakers
//    if (speaker) {
//     // res.json sets appropriate status code and response header
//     res.json(speaker);
//   } else {
//     return res.status(500).send('Database Error occurred');
//   }
// });