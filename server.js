var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('public'));

//we do line 12 because we do not want to push the password up to Github
//the (./) means in the directory I am in
var secret = require('./secret.json');


app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

//instead of using this to refresh the page we can send over some content for something else. 
//look at the functions below the login GET
// app.get('/secret_page', function(req,res){
// 	res.sendFile(__dirname + '/secret.html');
// });

//We are using req.query.password because we are using form with a GET
//If it was a post function we would be using req.body to grab the information
//now the if statement is (secret.password) because we are looking into the file to grab the password
//inside the hash.

app.get('/login', function(req,res){
	console.log(req.query)
	if (req.query.password === secret.password){
		res.redirect('/secret_page');
	} else {
		res.redirect('/')
	};
});

app.get('/secret_page', function(req,res){
	res.send('Hello! <a href="/secret_page2"> Secret Page 2 </a>');
});

app.get('/secret_page2', function(req,res){
	res.send("Hello Again! <a href='/secret_page'> Back to Secret Page 1 </a>")
})

app.listen(3000);
console.log("you are on 3000");















