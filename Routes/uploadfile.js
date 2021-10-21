const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');
const config = require('../config');
const createError = require('http-errors');
const qs = require('querystring');
const fs = require('fs');
const morgan = require('morgan');

/* catch all error */
const catchExceptions = func => {
    return (req, res, next) => {
        Promise.resolve(func(req, res)).catch(next);
    }
}

/* Parse the request body */
router.use(bodyParser.json())

/* log all requests and responses */
router.use(morgan('dev'));

/* File upload route */
router.post('/uploadfile', catchExceptions(async (req, res, next) => {
    /* Define configurations */
    let token = "";
    let XRequestDigest = "";
    let newFileLocation = "";
    let DownloadedFile = "";
    let bufferedFile = "";

    /**
     * Download Quickbase File Attachement
     */
    console.log('********* Download Quickbase File Attachement ********');
    const fileDownload = "https://api.quickbase.com/v1/files/" + process.env.TABLEID + "/" + req.body.rID + "/6/" + req.body.versionNumber;
    await axios.get(fileDownload, config.quickbase.QuickbaseOptions)
        .then((response) => {
            //console.log(response.data);
            DownloadedFile = response.data;
        })
        .catch((err) => {
            next(createError.NotFound)
        })

    /**
     * save file to local server
     */
    /*console.log('********* save file to local server ********');
    const DownloadedFileBuff = Buffer.from(DownloadedFile, 'base64');
    fs.writeFile('./temp/' + req.body.filename, DownloadedFileBuff, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
        console.log("Saved at " + __dirname + "/temp/" + req.body.filename);
    });*/

    /**
     * Get Auth token
     */
    /*await axios.post(config.msauth.authUrl, qs.stringify(config.msauth.authData), config.msauth.AuthOption)
        .then((response) => {
            token = response.data.access_token;
            //console.log(token);
        })
        .catch((err) => {
            console.error(err);
            next({ status: err.response.status, message: err.response.statusText })
        })*/

    /**
     * Get XRequestDigest
     */
    /*console.log('********* Get XRequestDigest ********');
    await axios.post(config.sharepoint.contextUrl, null, { headers: { 'Authorization': 'Bearer ' + token } })
        .then((response) => {
            XRequestDigest = response.data.FormDigestValue;
            console.log(XRequestDigest)
        })
        .catch((err) => {
            console.error(__dirname + "/temp/" + req.body.filename);
            next({ status: err.response.status, message: err.response.statusText });
        })*/

    /**
     * Read file from local server
     */
    /*console.log('********* Read file from local server ********');
    bufferedFile = fs.readFileSync("./temp/" + req.body.filename, (err) => {
        if (err) {
            console.log(err)
            next({ status: err.response.status, message: err.response.statusText });
        }
    });*/

    /**
     * Upload file to sharepoint library
     */
    /*console.log('********* Upload file to sharepoint library ********');
    const uploadfileUrl = config.sharepoint.uploadBaseUrl + "/" + "Files/add(url='" + req.body.filename + "',overwrite=true)";
    const uploadfileOptions = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'X-RequestDigest': XRequestDigest
        }
    };
    await axios.post(uploadfileUrl, Buffer.from(bufferedFile), uploadfileOptions)
        .then((response) => {
            console.log({ statusCode: response.status, message: response.statusText, fileUrl: "https://" + config.sharepoint.domain + response.data.ServerRelativeUrl });
            newFileLocation = "https://" + config.sharepoint.domain + response.data.ServerRelativeUrl;
        })
        .catch((err) => {
            next({ status: err.response.status, message: err.response.statusText });
        })*/

    /**
     * Update Quickbase Record
     */
    /*const QuickbasePostData = {
        "to": config.quickbase.TableID,
        "data": [{
            "3": {
                "value": req.body.rID
            },
            "13": {
                "value": newFileLocation
            }
        }],
        "fieldsToReturn": [
            3, 5, 13
        ]
    };
    await axios.post(config.quickbase.QuickbasePOST, QuickbasePostData, config.quickbase.QuickbaseOptions)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err)
        })*/

    /**
     * Delete the record file attachement
     */
    /*const dltUrl = config.quickbase.QuickbaseBaseUrl + "/files/" + process.env.TABLEID + "/" + req.body.rID + "/" + config.quickbase.FID + "/" + req.body.versionNumber;
    await axios.delete(dltUrl, config.quickbase.QuickbaseOptions)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
            next({ statusCode: err.response.status, errorMessage: err.response.statusText });
        })*/

    /**
     * Remove File from local server
     */
    /*console.log('********* Remove File from local server ********');
    fs.unlinkSync("./temp/" + req.body.filename, (err) => {
        if (err) {
            console.log(err)
            next({ statusCode: err.response.status, errorMessage: err.response.statusText });
        }
    });

    if (newFileLocation) {
        res.status(200).send({
            status: 200,
            message: {
                rID : req.body.rID,
                fileurl: newFileLocation
            }
        })
    } else {
        next(createError.InternalServerError())
    }*/
})
)

module.exports = router