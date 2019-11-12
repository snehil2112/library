const libgen = require('./libgen');
const util = require('util');
const Book = require('./Book')

const Library = {};
Library.latestBooks = ()=> {
    const mirror = util.promisify(libgen.mirror);
    return mirror().then((urlString, error) => {
        if(error) {
            const err = new Error(error);
            err.status(404);
            throw err; 
        }
        const latest = libgen.latest;
        const latestText = util.promisify(latest.text);
        return latestText(urlString).then(data => {
            let result = [];
            data.forEach(elem => {
                result.push(new Book(elem));
            })
            return result;
        }).catch(error => {
            const err = new Error(error);
            err.status(404);
            throw err;
        })
    })
}

Library.searchBooks = (query, page) => {
    const mirror = util.promisify(libgen.mirror);
    return mirror().then((urlString, err) => {
        if(err) {
            return console.log(err); 
        }
        const option = {
                        mirror : urlString,
                        query: query,
                        reverse: true,
                        page: page
                    };
        const search = util.promisify(libgen.search);
        return search(option).then((data) => {     
            let result = [];
            data.forEach(element => {
                result.push(new Book(element));
            });
            
            return result;
        }).catch(error => {            
            const err = new Error(error);
            err.status = 404;
            throw err;
            
        })
    })
}

Library.randomBooks = () => {
    const mirror = util.promisify(libgen.mirror);
    return mirror().then((urlString, err) => {
        if(err) {
            return console.log(err); 
        }
        console.log(urlString)
        const options = {
            count: 25,
            mirror: urlString
          };
        const random = libgen.random;
        const randomText = util.promisify(random.text);
        return randomText(options).then((data) => {
            let result = [];
            data.forEach(element => {
                result.push(new Book(element));
            });
            return result;
        }).catch(error => {
            const err = new Error(error);
            err.status = 404;
            throw err;
        })
    })
}

module.exports = Library;