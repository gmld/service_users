const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongo_client = require('mongodb').MongoClient;
const mongo_url = "mongodb://localhost:27017/users";
const collection = "users";
const endpoint = "/users";
const request = require('request');
const os = require('os')

// for parsing application/json
app.use(bodyParser.json());


app.post(endpoint, function (req, res) {
    var myobj = req.body;
    console.log(myobj)
    var myurl1 = 'http://'+os.hostname+":8001/consumers"
    var myurl2 = 'http://'+os.hostname+":8001/consumers/"+myobj.username+"/basic-auth"
    
    var createcode = 0
    request.post({
         url: myurl1,
         form: {username: myobj.username} }, function(error, response, body){
             createcode = response.statusCode
             console.log(response)
    });
    // if(createcode != 201){
    //     res.status(409).json({"message":"user exist!"})
    // }
    request.post({
        url: myurl2,
        form: myobj}, function(error, response, body){
            createcode = response.statusCode
            console.log(createcode)
            console.log(response)
   });


    res.status(200).json(myobj);
});

app.listen(3002, () => console.log('Example app listening on port 3002!'))

module.exports = app