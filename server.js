var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');



app.use(express.static('public'));

var secret = "penguin";

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/secret_page', function(req,res){
	res.sendFile(__dirname + '/secret.html');
});

//We are using req.query.password because we are using form with a GET
//If it was a post function we would be using req.body to grab the information

app.get('/login', function(req,res){
	if (req.query.password === secret){
		res.redirect('/secret_page');
	} else {
		res.redirect('/')
	};
});

app.listen(3000);
console.log("you are on 3000")