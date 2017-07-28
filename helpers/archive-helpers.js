var path = require('path');
var _ = require('underscore');
var request = require('request');
var fs = require('fs');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    } else {
      var urlArray = data.split('\n');
      urlArray.forEach(function(value, index) {
        if (value === '') {
          urlArray.splice(index);
        }
      });
      // console.log(urlArray)
      callback(urlArray);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  var urlList = this.paths.list;
      //console.log(urlList); 
  fs.readFile(urlList, 'utf-8', (err, data) => {
    if (err) { 
      throw err; 
    } else {
      //console.log(data)
      var exists = data.includes(url);
      callback(exists);
      // if(data.includes(url)){
      //   callback(data); 
      // }
// else{
//         this.addUrlToList(url, callback);
//       }
      
    }
  });
};

exports.addUrlToList = function(url, callback) {
  // console.log(this.paths.list)
  request(url, function (error, response, body) {
    if (!error) {
      fs.appendFile(this.paths.list, url, (err, data) => {
        if (err) {
          throw err;
        } else {
          callback(data);
        }

      });
    }
  });

// the object request will be actually modified
      // console.log(this.paths.list)
};

exports.isUrlArchived = function(url, callback) {
  //console.log(this.paths.archivedSites)
  if (url) {
    if (url[0] === '/') {
      url = url.slice(1);
    }
    fs.readdir(exports.paths.archivedSites, (err, data) => {
      if (err) {
        throw err; 
      } else {
      // console.log(url)

        var exists = data.includes(url);
        callback(exists);
      }
    });
  }
};

exports.downloadUrls = function(urls) {
  console.log(urls, 'urls');
  urls.forEach(function(item) {
    exports.isUrlArchived(item, function(exists) {
      if (!exists) {
        var stream = fs.createWriteStream(exports.paths.archivedSites + '/' + item);
        request('http://' + item).pipe(stream);
        // stream.end();
      }

    });

    // var filestream = fs.createWriteStream(this.paths.archivedSites + '/' + item);
  });
};
