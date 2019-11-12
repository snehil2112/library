'use strict';

const latest = require('./latest.js');
const clean = require('./clean.js');
const request = require('request');
const async = require('async');

function rInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  text: function(options, callback){
    if (!options.mirror)
      return callback(new Error('No mirror given to random.text()'));

    latest.id(options.mirror, (err, data) => {
      if (err)
        return callback(err);

      else if (!options.count || !parseInt(options.count))
        options.count = 1;
      let n = options.count;
      let picks=[]
      while(n--) {
        picks.push(rInt(1, data));
      }
      picks = picks.join(',');
      
      const httpOptions = { url: `${options.mirror}/json.php?ids=${picks}&fields=*` };

      request(httpOptions, (err, response, body) => {
        if(err) {
          return callback(err);
        }
        return callback(null, JSON.parse(body));
      })
    });
  }
};
