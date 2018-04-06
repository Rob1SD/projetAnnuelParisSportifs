var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');

/* GET users listing. */
router.get('/getUser/:pseudo', function(request, res, next) {
	var pseudo = request.params.pseudo;
	function getLastRecord(pseudo)
	{
		return new Promise(function(resolve, reject) {
			
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "select username from users where username='"+pseudo+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	getLastRecord(pseudo).then(function(rows){
		res.send(rows);
	});
		
});
router.get('/connect/:pseudo/:pwd', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = md5(request.params.pwd);
	function getLastRecord(pseudo)
	{
		return new Promise(function(resolve, reject) {
			
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "select * from users where username='"+pseudo+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	getLastRecord(pseudo).then(function(rows){
		console.log("rows = " + JSON.stringify(rows))
		console.log("pwd = " + pwd)
		console.log("BASEpwd = " + rows["0"].pwd)
		if (rows["0"].pwd == pwd)
			res.send("true");
		else
			res.send("false");
	});
		
});
router.post('/create/:pseudo/:pwd/:email', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = md5(request.params.pwd);
	var email = request.params.email;
	function getLastRecord(pseudo,pwd, email)
	{
		return new Promise(function(resolve, reject) {
		
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
				
			var sql = "insert into users(username, pwd, email) values('"+pseudo+"','"+pwd+"','"+email+"');";
			console.log(sql);
			
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	getLastRecord(pseudo, pwd, email).then(function(rows){
		res.send(rows);
	});
		
});
router.post('/changPwd/:pseudo/:pwd/:newPwd', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = md5(request.params.pwd);
	var newPwd = md5(request.params.newPwd);
	function getLastRecord(pseudo)
	{
		return new Promise(function(resolve, reject) {
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "select * from users where username='"+pseudo+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	function changePassword(pseudo, pwd)
	{
		return new Promise(function(resolve, reject) {

			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "update users set pwd='"+pwd+"' where username='"+pseudo+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	getLastRecord(pseudo).then(function(rows){
		console.log("rows = " + JSON.stringify(rows))
		console.log("pwd = " + pwd)
		console.log("BASEpwd = " + rows["0"].pwd)
		if (rows["0"].pwd == pwd)
		{
			changePassword(pseudo, newPwd).then(function(rows){
			
				res.send(true);
			});
			
		}
		else
			res.send(false);
	});
		
});

router.post('/changEmail/:pseudo/:pwd/:newEmail', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = md5(request.params.pwd);
	var newEmail = request.params.newEmail;
	function getLastRecord(pseudo)
	{
		return new Promise(function(resolve, reject) {
	
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "select * from users where username='"+pseudo+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	function changeEmail(pseudo, newEmail)
	{
		return new Promise(function(resolve, reject) {
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "update users set email='"+newEmail+"' where username='"+pseudo+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	getLastRecord(pseudo).then(function(rows){
		console.log("rows = " + JSON.stringify(rows))
		console.log("pwd = " + pwd)
		console.log("BASEpwd = " + rows["0"].pwd)
		if (rows["0"].pwd == pwd)
		{
			changeEmail(pseudo, newEmail).then(function(rows){
			
				res.send(true);
			});
			
		}
		else
			res.send(false);
	});
		
});
module.exports = router;
