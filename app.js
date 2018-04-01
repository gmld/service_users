const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const request = require('request');
const mongo_client = require('mongodb').MongoClient;
const mongo_url = "mongodb://mongo:27017/users";
const collection = "users";
const endpoint = "/users";
const hostname = 'kong'

app.use(bodyParser.json());

app.post(endpoint, function (req, res) {
    var myobj = req.body;
    var myurl1 = 'http://'+hostname+":8001/consumers"
    var myurl2 = 'http://'+hostname+":8001/consumers/"+myobj.username+"/basic-auth"
    
    var createcode = 0
    request.post({
         url: myurl1,
         form: {username: myobj.username} }, function(error, response, body){
             createcode = response.statusCode
    });

    request.post({
        url: myurl2,
        form: myobj}, function(error, response, body){
            createcode = response.statusCode
    });
    
    res.status(200).json(myobj);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app