var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    // console.log(req.url)  
    if (req.url === '/') {
    
    // http.serveAssets(res, path.join(__dirname, '/web/index.html'), (err, data) => {
      fs.readFile('./web/public/index.html', 'utf-8', (err, data) => {
        if (err) { 
          throw err; 
        } else {
          // console.log(JSON.stringify('./public/index.html'));
          console.log('itsthisone');
          statusCode = 200;
          res.writeHead(statusCode, httpHelper.headers);
          res.end(data);
        }
      });
    } else {
      archive.isUrlArchived(req.url, (exists) => {
            // console.log(req.url)
        if (!exists) {
          archive.addUrlToList(req.url, (err, data) => {
            statusCode = 404;
            console.log('thisone');
            res.writeHead(statusCode, httpHelper.headers);
            res.end();    
          });
          
        } else {
          httpHelper.serveAssets(res, req.url, (err, data) => {
          //redirect user to archived html page
            statusCode = 200;
            console.log('noitsthisone');
            res.writeHead(statusCode, httpHelper.headers);
            res.end(data);
          });
        }
      });
      
    }
  // }else if (req.method === "GET" && req.url !== '/'){
  //   // httpHelper.serveAssets(res, req.url, (err, data) => {
  //   //   if(err){
  //   //     statusCode = 404;
  //   //     res.writeHead(statusCode, httpHelper.headers);
  //   //     res.end();
  //   //   } else {
  //   //     statusCode = 200;
  //   //     res.writeHead(statusCode, httpHelper.headers);
  //   //     res.end(data);
  //   //   }
  //   // });
  //   fs.readFile(archive.paths.archivedSites + req.url, function(err, data) {
  //     if(err){
  //       statusCode = 404;
  //       res.writeHead(statusCode, httpHelper.headers);
  //       res.end();
  //     } else {
  //       statusCode = 200;
  //       res.writeHead(statusCode, httpHelper.headers);
  //       res.end(data);
  //     }
  //   });
  }
  if (req.method === 'POST') {
        
  }

};
