var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');
var session = require('express-session');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

//we do line 12 because we do not want to push the password up to Github
//the (./) means in the directory I am in
var secret = require('./secret.json');

app.use(session({
  secret: secret.password,
  resave: false,
  saveUninitialized: true
}));


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

app.post('/session', function(req,res){
	if (req.body.password === secret.password){
		req.session.valid_user = true;
		res.redirect('/secret_page');
	} else {
		res.redirect('/')
	};
});

app.get('/secret_page', function(req,res){
	if (req.session.valid_user === true){
		res.send('Hello! <a href="/secret_page2"> Secret Page 2 </a>');
	} else {
		res.redirect('/');
	} 
});

app.get('/secret_page2', function(req,res){
	if (req.session.valid_user === true) {
		res.send("Hello Again! <a href='/secret_page'> Back to Secret Page 1 </a>")
	} else {
		res.redirect('/');
	}
})

app.listen(3000);
console.log("you are on 3000");















