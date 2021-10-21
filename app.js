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

/* define defualt route */
app.get('/', (req, res, next)=>{
    res.send({
        "request" : "/api/uploadfile/"
    })
})

/* exclude all routes that are not defined */
app.use('*', async (req, res, next) => {
    next(createError.NotFound())
})

/* handle errors */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

/* initialize the server */
app.listen(config.server.port, () => {
    console.log(`Server is running port : ${config.server.port}`)
})