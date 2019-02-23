console.log('hello world');
const hostname = '127.0.0.1';
const port = 3001;

var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

//bodyparser middleware
//below line is to add middleware for initialize bodyparser
app.use(bodyParser.json());
//app.use(bodyParser-urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

 Genre = require('./models/genres');
 Book = require('./models/books');
 Y2b = require('./models/y2b');

//connect to mongoose
mongoose.connect('mongodb://localhost/y2b');
var db = mongoose.connection;

//the HOME page with default to /
app.get('/',function(req, res){
	//res.send('Hello World');
	res.send('Please use /api/y2b');
	
});
//get all y2b records
app.get('/api/y2b',function(req, res){
	Y2b.getY2b(function(err, y2b){
		if(err){
			throw err;
		}
		res.json(y2b);
	});
});
//add a y2b record
app.post('/api/y2b', function(req, res){
	var y2b = req.body;
	Y2b.addY2b(y2b, function(err, y2b){
		if(err){
			throw err;
		}
		res.json(y2b);
	});
});
//update a y2b record
app.put('/api/y2b/:_id', function(req, res){
	var id = req.params._id;
	var y2b = req.body;
	Y2b.updateY2b(id, y2b, {}, function(err, y2b){
		if(err){
			throw err;
		}
		res.json(y2b);
	});
});
//remove/delete a y2b record
app.delete('/api/y2b/:_id', function(req, res){
	var id = req.params._id;
	var y2b = req.body;
	Y2b.removeY2b(id, function(err, y2b){
		if(err){
			throw err;
		}
		res.json(y2b);
	});
});



//=============================================
//get all books
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
//get book by id
app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//add a book
app.post('/api/books', function(req, res){	
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//update book
app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//remove/delete a book
app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});



app.listen(port);
console.log('running on port: '+port);
