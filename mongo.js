var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB);


var db = mongoose.connection;
var bookSchema = mongoose.Schema({
  name: String,  
  isbn: {type: String, index: true},
  author: String,
  pages: Number
});

var Book = mongoose.model('Book', bookSchema, "mongoose_demo");

var queryBooks = function(qty){ 
  Book.find({pages : {$gt:qty}},"name", function(err, result){
    if ( err ) throw err;
    console.log("Find Operations: " + result);
  });
}
var andQuery =function(v1,v2){
	Book.find({$and:[
			{"name":v1},
			{"isbn":v2}
		]},"author",(err,res)=>{
			if(err)
					throw err;
			console.log(res)
		})
}
var orQuery =function(v1,v2){
	Book.find({$or:[
			{"name":v1},
			{"isbn":v2}
		]},"author",(err,res)=>{
			if(err)
					throw err;
			console.log(res)
		})
}
var updateBook = function(ISBN){
  Book.update({isbn : {$eq: ISBN}}, {$set: {name: "Updated_Book_Name"}}, function(err, result){
    console.log("Updated successfully");
    console.log(result);
  });
}
var DetailQuery=(v1)=>{
	var q=Book.find({'name':v1})
	q.select('author')
	q.exec((err,res)=>{
		if(err)
			throw err;
		console.log(res);
	})
}
var DetailQuery2=(v1,v2)=>{
	Book.find().
	where('name').equals(v1).
	where('pages').gt(v2).
	select('author').
	exec((err,res)=>{
		if(err)
			throw err;
		console.log("res:"+res);
	})
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){

	console.log("Connected to DB");
	//save operation
	
	/*var book1 = new Book({
	  name:"Mongoose Demo 1",
	  isbn: "MNG123",
	  author: "Author1,  Author2",
	  pages: 123
	});

	
	book1.save(function(err){
	  if ( err ) throw err;
	  console.log("Book Saved Successfully");
	});

	var book2 = new Book({
	  name:"Mongoose Demo 2",
	  isbn: "MNG124",
	  author: "Author2,  Author3",
	  pages: 90
	});

	book2.save(function(err){
	  if ( err ) throw err;
	  console.log("Book Saved Successfully");
	});*/
	//  queryBooks(80)
	//updateBook('MNG123')
	//andQuery("Updated_Book_Name","MNG123")
	//orQuery("Updated_Book_Name","MNG124")
	//DetailQuery("Updated_Book_Name")
	DetailQuery2("Updated_Book_Name",120)
});

