var express = require('express');
var app = express();
var request = require('request');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');
var session = require('express-session');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('authentication.db');
var bcrypt = require ('bcrypt');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

//we do line 12 because we do not want to push the password up to Github
//the (./) means in the directory I am in
var secret = require('./secret.json');

app.use(session({
  secret: "string",
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

app.post('/user', function(req,res){
	var username = req.body.newName;
	var password = req.body.newPassword;
	console.log(username);
	console.log(password);

	if (req.body.newPassword === req.body.confirmPass){
		var hash = bcrypt.hashSync(password, 8);
		// Now the password is the hash you have created
		db.run('INSERT INTO users(username, password) VALUES (?, ?)', username, hash, function(err){
			if(err) { throw err;}

		});
		res.redirect('/');
	} else {
		res.redirect('/');
	}
});

app.post('/session', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	console.log("your username is " + username);
	console.log("your password is " + password);
	console.log("you are now in session post");

	db.get('SELECT * FROM users WHERE username = ?', username, function(err, row){
		if(err) {throw err;}
		
			if(row) {
				var passwordMatches = bcrypt.compareSync(password, row.password);
				console.log(passwordMatches)
				if (passwordMatches) { 
					req.session.valid_user = true;
					res.redirect('/secret_page');	
				}
		} else {
			res.redirect('/');	
		}
	});
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















