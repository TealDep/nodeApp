var express = require('express');
var bodyParser=require('body-parser');
var path=require('path');
var app = express();
 
/*app.use(express.static('view'));*/

/*var log=function (req,res,next) {
	// body...
	console.log('lego');
	next();

}
app.use(log);*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')))

var DC=[
	{
		name:'batman',
		alias:'bruce wayne'
	},
	{
		name:'Flash',
		alias:'Barry Allen'
	}
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/', function(req, res){
	
	/*res.sendFile( __dirname + "/view/" + "home.html" );*/
	/*res.json(DC);*/
    res.render('index',{data:DC});
});
app.post('/add',function(req,res){
	console.log('incomingggggggggg.....')
	var hero={
		name:req.body.name,
		alias:req.body.alias
	}
	DC.push(hero);
	res.render('index',{data:DC});
	console.log(DC);
});
app.post('user/add',function(req,res){
	console.log(req.body);
});


app.listen(3000,function(){
	console.log('starting ............')
});
 
