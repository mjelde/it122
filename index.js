'use strict'

import http from 'http';
// import fs from 'fs';
import * as data from "./data.js";
import { parse } from "querystring";

http.createServer(function(request, response) {
  var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddresponses;
  var url = request.url;
  let urls = request.url.split("?");  // separate route from query string
  let path = urls[0].toLowerCase(); // Get Part of the path for case
  let query = parse(url[1]);
    switch(path) {
        case "/":
        response.writeHead(200, {'Content-Type': 'text/html'});
        let all = data.getAll();
        response.write(JSON.stringify(all));
        // fs.readFile('./index.html', null, function (error, data) {
        // if (error) {
        //     response.writeHead(404);
        //     response.write('file not found');
        // }
        // else {
        //     response.write(data);
        //     }
        // });
        response.end();
        break;
        case '/about':
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1> Hello my name is Sharon Mjelde</h1>'); 
        response.write('<p> Welcome to my website! Share and enjoy! </p>'); 
        response.end(); 
        break;
        case '/get':
        response.writeHead(200, {'Content-Type': 'text/html'});
        let speakers = data.getAll(); // get all from data
        response.write(JSON.stringify(speakers));
        response.end(); 
        break;
        case '/getDetail':
          if (request.method == "GET") {
                let found = data.getItem(query.name);
                console.log(found);
                response.writeHead(200, {'Content-Type': 'text/html'});
                let result = (found) ? JSON.stringify(found) : "not found";
                response.end(JSON.stringify(result));
          }
        break;
        default:
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page Not found time to try again!');
          }
}).listen(3000);