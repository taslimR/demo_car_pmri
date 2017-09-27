var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var server = require('http').createServer(app);

var path = require('path');
app.engine('html', require('ejs').renderFile);
users = [];
connections = [];

var session_use = "";


//app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static(path.join(__dirname, 'public/give_help')));

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: " me[t45ot6ripo74yh474",
	resave: false, 
	saveUninitialized: true
}));
app.get('/', function(req,res){
	
	//res.sendFile(__dirname + '/index.html');
	res.render('index.html');
});
app.post('/', function(req,res){
		
			
			console.log('SUCESS!!\n');
			//console.log(rows);
			session_use = req.body.user;
			console.log(req.body.user+" "+req.body.pass);
			if(req.body.user == "admin@admin" && req.body.pass == "admin"){
				res.render('index2.html',
				    {t1: req.session.req.body.user});
			}
			else{
				res.render('index.html');
			}
});

//logout
app.get('/logout',(req, res) =>{
	console.log(session_use);
	req.session.destroy();
	session_use = "";
	console.log('destroyed');
	console.log(session_use);
	res.redirect('/');
});

//login
app.get('/logout_pmri',(req,res) => {
	if(session_use){
		res.render('index2.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//pmri
app.get('/pmri',(req,res) => {
	if(session_use){
		res.render('pmri.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

//create_pf
app.get('/create_pf',(req,res) => {
	if(session_use){
		res.render('create_pf.html',
				    {t1: req.session.session_use});
	}
	else{
		console.log('session invalid');
		res.redirect('/');
	}
});

app.use(express.static(path.join(__dirname, 'public')));
server.listen(process.env.PORT || 80);
console.log('server running....');

