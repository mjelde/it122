'use strict'

const exphbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");
const data = require('./data.js');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.engine("handlebars", exphbs({defaultLayout: false}));
app.set("view engine", "handlebars");

// send content of 'home' view
app.get('/', (req,res) => {
  let result = data.getAll();
  res.render('home', {body : result});
 });
 
 // send plain text response
 app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About page');
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

 // send content of 'home' view
app.get('/get', (req,res) => {
  let result = data.getItem(req.query.title);
  res.render('details', {title: req.query.title, result: result });
 });

 app.get('/getdetail', (req,res) => {
  let result = data.getItem(req.query.name);
  res.render('details', {title: req.query.name, result: result });
 });

// http.createServer(function(request, response) {
//   var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddresponses;
//   var url = request.url;
//   let urls = request.url.split("?");  // separate route from query string
//   let path = urls[0].toLowerCase(); // Get Part of the path for case
//   let query = parse(urls[1]);
//     switch(path) {
//         case "/":
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write("<html><title>Hello World</title>");  
//         response.write("<body><h1>Hello World</h1></body></html>");  
//         // let all = data.getAll();
//         // response.write(JSON.stringify(all));
//         response.end();
//         break;
//         case '/about':
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write('<h1> Hello my name is Sharon Mjelde</h1>'); 
//         response.write('<p> Welcome to my website! Share and enjoy! </p>'); 
//         response.end(); 
//         break;
//         case '/get':
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         let speakers = data.getAll(); // get all from data
//         response.write(JSON.stringify(speakers));
//         response.end(); 
//         break;
//         case '/getdetail':
//           let found = data.getItem(query.name);
//           response.writeHead(200, {'Content-Type': 'text/html'});
//           let result = (found) ? JSON.stringify(found) : "not found";
//           response.end(JSON.stringify(result));
//         break;
//         default:
//         response.writeHead(404, {'Content-Type': 'text/plain'});
//         response.end('Page Not found time to try again!');
//     }
// }).listen(3000);