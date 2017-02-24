var bodyParser=require('body-parser');
var mongoose=require('mongoose');


//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://testuser:mynewpassword@ds153239.mlab.com:53239/mytododb');

// create a schema
var todoSchema=new mongoose.Schema({
	item:String
});

var Todo=mongoose.model('Todo',todoSchema);

var urlencodedParser=bodyParser.urlencoded({extended:false});
/*
var itemOne=Todo({item:'Some things'}).save(function(err) {
	if (err) throw err;
	console.log('item saved');
});*/

var data=[{item:'networking'},{item:'dbms'},{item:'algos'}];
module.exports=function (app) {

app.get('/todo',function(req,res)
{ 
	console.log('get');
	Todo.find({},function(err,data) {
		if(err) throw err;
		res.render('todo',{todos:data});
	})
	
});


app.post('/todo',urlencodedParser,function(req,res)
{
	console.log('post');
	var newTodo=Todo(req.body).save(function(err,data){
		if (err) throw err;
		console.log('Added...');//res.json(data);
	})

	//console.log(req.body.item);
	res.redirect(req.get('referer'));
	/*Todo.find({},function(err,data) {
		if(err) throw err;
		res.render('todo',{todos:data});
	})*/

});


app.delete('/todo/:item',function(req,res)
{
	var delTodo=req.params.item.replace(/\-/g," ");
	console.log('Delete request got: ' + delTodo);
	Todo.find({item:delTodo}).remove(function(err,data)
	{
		if (err) throw err;
		res.json(data);
	})
	
});

}