'use strict'

import http from 'http';
import fs from 'fs';
import * as data from "./data.js";

http.createServer(function(request, response) {
var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddresponses;
var url = request.url;
    if(url === "/") {
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('file not found');
        }
        else {
            response.write(data);
        }
        response.end();
    })}
    else if(url ==='/about') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<h1> Hello my name is Sharon Mjelde</h1>'); 
        response.write('<p> Welcome to my website! Share and enjoy! </p>'); 
        response.end(); 
    } 
    else if(url ==='/get') {
      response.writeHead(200, {'Content-Type': 'text/html'});
      let speakers = data.getAll(); // get all from data
      response.write(JSON.stringify(speakers));
      response.end(); 
  } 

    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page Not found Please Try Again!'); 
    }
}).listen(3000);