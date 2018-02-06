
//call the packages we need
var express = require('express'); //call express
var app = express();//define your app using express
var bodyParser = require('body-parser');
 var multer = require('multer');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS");
    next();
});




var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });


//multer object
 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count


var router = express.Router(); //get an instance of express router



//routes for our api
//=========================================================================

app.get("/", function(req, res) {
     res.sendFile(__dirname + "/upload.html");
 });

 
 app.post("/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });

app.use('/user',router);

//start the server
//==============================================================
//app.listen(port);
app.listen(3000, '0.0.0.0');
console.log('Magic happens on port 3000 ');

