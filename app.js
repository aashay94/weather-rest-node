var express = require('express')
var app = express()
const weather = require("./weather");
const validate = require("./validateZip");
const { response } = require('express');
const url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&rows=766&facet=state&facet=timezone&facet=dst&refine.state=MA';
var cors = require('cors');
var port = process.env.PORT || 3000;

app.use(cors())

// route

app.get('/forecast/:zipCode', (req, res) => {
    var obj, zipCode, isValidZip;
    zipCode = req.params.zipCode;
    isValidZip = validate.validateZip(zipCode);
    if(url == '') {
        res.status(404).json({message:"URL or API not found"})
    }
    else if (isValidZip) {
        obj = weather.getLatLong(zipCode, url);
        obj.then((val) =>{
            val = val.split("\n");
            console.log(val);
            res.status(200).json({status: 'success', val: val})
        })
    } else {
        res.status(400).json({ status: 'failed', message: "zipCode not valid" });
    }
});

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Type", "text/plain");
    const error = new Error("Not found");
    error.status = 404;
    // console.log(res);
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

// start the server
if (!module.parent) {
app.listen(port);
}

console.log('Server started! At http://localhost:' + port);

module.exports = app;