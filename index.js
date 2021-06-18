'use strict'

const exphbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");
const data = require('./data.js');
const cors = require('cors');
const Speaker = require("./models/speaker");

const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.engine("handlebars", exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

//  send content of 'home' view
app.get('/', (req,res, next) => {
  Speaker.find({}).lean()
  .then((speakers) => {
  res.render('home2', {speakers: JSON.stringify(speakers)});
  })
  });
 
 // send plain text response
 app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('Sharon Mjelde - IT122 - Seattle Central College');
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

app.get('/api/speaker', (req,res) => {  // get all data
  Speaker.find({}).lean()
    .then((speakers) => {
    console.log(speakers)
  res.json(speakers);
  })
    .catch(err => res.status(500).send('Database Error occurred'));
 });

app.get('/api/speaker/:name', (req,res) => {  // get one object
  Speaker.findOne({"name": req.params.name }).lean()
    .then((onespeaker) => {
    console.log(onespeaker)
  res.json(onespeaker);
  })
    .catch(err => res.status(500).send('Database Error occurred'));
 });

app.get('/api/speaker/delete/:name', (req,res) => {  // delete one object
   Speaker.deleteOne({"name": req.params.name }).lean()
     .then((result) => {
     console.log(result)
   res.json(result);
   })
     .catch(err => res.status(500).send('Database Error occurred'));
  });

app.post('/api/speaker/update', (req,res) => {  // add one object
   console.log(req.body);
   Speaker.updateOne({'name': req.body.name }, req.body, {upsert:true}, (err, result) => {
   console.log(result);
   if (err) return next(err);
   res.json(result);
  });
  });

 // define 404 handler - leave at the bottom before listen and after all other routes
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
 });

app.listen(app.get('port'), () => {
  console.log('Express started');
 });