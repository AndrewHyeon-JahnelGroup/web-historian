var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};
  
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var storage = archive.paths;
  fs.readFile(archive.paths.archivedSites + '/' + asset, function(err, data) {
    callback(data);
  });
  
};
var statusCode;
// var urlList = fs.readFile(__dirname+'/public/index.html', (err, data) => {
//   if (err) { throw err; }
//   console.log(data);
// });
// console.log(exports.headers);
exports.requestMethods = {

  // GET: function(request, response) {
  //   statusCode = 200;
  //   //console.log(exports.headers);
  //   fs.readFile('./web/public/index.html', (err, data) => {
  //     if (err) { 
  //       throw err; 
  //     } else {
  //       //console.log(data);
  //       response.writeHead(statusCode, exports.headers);
  //       // if(request.)
  //       response.end(data);

      
  //     }
  //   });
  // }

    
};


// As you progress, keep thinking about what helper functions you can put here!
