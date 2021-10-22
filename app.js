const express = require('express');
//const bodyParser = require('body-parser')
const morgan = require('morgan');
const config = require('./config');
const createError = require('http-errors')
const uploadfileRoute = require('./Routes/uploadfile.js')

const app = express();

/* define routes */
app.use('/api', uploadfileRoute)

/* log all requests and responses */
app.use(morgan('dev'));

/* exclude all routes that are not defined */
app.use(async (req, res, next) => {
    next()
})

/* handle errors */
app.use((err, req, res, next) => {
    let error = JSON.parse(err.message);
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    })
})

/*  */
process.on('uncaughtException', err => {
    console.error('There was an uncaught error ', err)
})

/* initialize the server */
app.listen(config.server.port, () => {
    console.log(`Server is running port : ${config.server.port}`)
})