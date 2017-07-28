var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
var qs = require('qs');
var request = require('request');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
    
      fs.readFile('./web/public/index.html', 'utf-8', (err, data) => {
        if (err) { 
          throw err; 
        } else {
          // console.log('itsthisone');
          statusCode = 200;
          res.writeHead(statusCode, httpHelper.headers);
          res.end(data);
        }
      });
    

    } else {
      archive.isUrlArchived(req.url, (exists) => {
        if (!exists && !req.url.includes('/web/loading.html') && !req.url.includes('css')) {
          archive.addUrlToList(req.url+'\n', (err, data) => {
            statusCode = 404;
            res.writeHead(statusCode, httpHelper.headers);
            res.end();    
          });
          
        } else if (!exists && req.url.includes('/web/loading.html')) {
          fs.readFile('./web/public/loading.html', 'utf-8', (err, data) => {
            if (err) { 
              throw err; 
            } else {
          
              statusCode = 302;
              res.writeHead(statusCode, httpHelper.headers);
              res.end(data);
            }
          });
        } else {
          fs.readFile(archive.paths.archivedSites + req.url, (err, data) => {
          //redirect user to archived html page
            statusCode = 200;
            res.writeHead(statusCode, httpHelper.headers);
            res.end(data);
          });
        }
      });
    }  
  } else if (req.method === 'POST') {
    var body = '';
    req.on('data', function(chuck) {
      body += chuck;
    });
    
    
    req.on('end', function() {
      // console.log(body)
      if (archive.paths.list.toString().length === 0) {
        var newbody = qs.parse(body).url;
      } else {
        newbody = '\n' + qs.parse(body).url;
       // console.log(tempbody) 
      }
        // console.log(qs.parse(body).url)
      archive.isUrlArchived(qs.parse(body).url, function(exists) {
      // console.log(exists);
        if (exists) {
          var url = qs.parse(body).url;
          // console.log(body, 'body')
          res.writeHead(302, {'Location': '/' + url});
          res.end();
        } else {
      
          fs.appendFile(archive.paths.list, newbody, function(err, data) {
            if (err) {
              throw err;
            } else {
              res.writeHead(302, {'Location': './web/loading.html'});
              res.end();
            }
          

          });
        }
      });
    });
  }

        

};
