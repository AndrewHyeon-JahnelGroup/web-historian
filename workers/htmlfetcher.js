// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting
var cron = require('cron');
var helper = require('../helpers/archive-helpers');
var fs = require('fs');

fs.readFile(helper.paths.list, 'utf8', (err, data) => {
  list = data.split('\n');  
  var cronjob = new cron.CronJob('10 * * * * *', function() {
    helper.readListOfUrls(helper.downloadUrls);
    for (var i = 0; i < list.length; i++) {
      console.log(list[i]);
    }
  }, null, true, 'America/Los_Angeles');
  // cron.schedule('2, * * * * *' , helper.downloadUrls(list));
});
// console.log(list)
