'use strict';

const request = require('request');

// TODO: this is pretty brittle; if libgen changes how they format
// results it will break
const LATEST_ID_REGEX = /<td>[0-9]+<\/td>/g;

const latest = {};

latest.id = function(mirror, callback) {
  const httpOptions = { url: `${mirror}/search.php?mode=last` };
  request(httpOptions, (err, response, body) => {
    if (err) {
      console.error('Request error');
      return callback(err);
    }
    else if (response.statusCode !== 200) {
      return callback(
        new Error(`Bad reponse code (${response.statusCode}) for ${httpOptions.url}`)
      );
    }
    const idsResults = body.match(LATEST_ID_REGEX);
    const latestId = idsResults[0].replace(/[^0-9]/g,"");
    if (!parseInt(latestId))
      return callback(new Error(`Failed to return a numeric ID: ${latestId}`));
    // returning a string rather than a number because once the IDs
    // get higher JS might start mangling them
    return callback(null, latestId);
  });
}

latest.text = function(mirror,callback){
  latest.id(mirror, (err, data) => {
    if (err)
      return callback(err);
    let picks = [data]
    let n = 24;
    while(n--) {
      picks.push(data-24+n)
    }
    picks = picks.join(',');
    
    const httpOptions = { url: `${mirror}/json.php?ids=${picks}&fields=*` };
    request(httpOptions, (err, response, body) => {
      if (err)
        return callback(err);
      else if (response.statusCode !== 200)
        return callback(new Error(`Bad response code: ${response.statusCode}`));
      // the API always returns an array of objects, so for
      // functions like this which are mean to return a single text,
      // we pick out the first (only) element in the array
      // automatically
      return callback(null, JSON.parse(body));
    });
  });
}


module.exports = latest;
