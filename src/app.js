const express = require('express');
const app = express();
const bodyParser=require('body-parser'); 
const router = require('./routes/routing');
const cors = require('cors');
const requestLogger = require('./utilities/RequestLogger');
const errorLogger = require('./utilities/ErrorLogger');

app.set('json spaces', 4)
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.listen(process.env.PORT);
console.log('server running on 4000');
