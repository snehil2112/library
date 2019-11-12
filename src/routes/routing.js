const express = require('express');
const router = express.Router();
const Library = require('../services/fetchBooks')

router.get('/latest', (req, res, next) => {
    Library.latestBooks().then(_ => {
        res.json(_)
    }).catch(err => {
        next(err);

    })
})

router.get('/searchBooks/:query/:page', (req, res, next) => {
    Library.searchBooks(req.params.query, req.params.page).then(_ => {
        res.json(_);
        console.log(res.statusCode);
    }).catch(err => {
        console.log('Error'+err.status);
        
        next(err);
    })
})

router.get('/randomBooks', (req, res, next) => {
    Library.randomBooks().then(_=> {
        res.json(_);
    }).catch(err => {
        next(err);
    })
})

module.exports = router;