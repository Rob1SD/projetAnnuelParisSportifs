var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/getUser/:pseudo/:pwd', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = request.params.pwd;
	function getLastRecord(pseudo,pwd)
	{
		return new Promise(function(resolve, reject) {
			// The Promise constructor should catch any errors thrown on
			// this tick. Alternately, try/catch and reject(err) on catch.
			
			var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "",
			  database: "ps"
			});
			con.connect(function(err) {
				if (err) throw err;
				console.log("Connected!");
			
			var sql = "select * from users where username='"+pseudo+"' and pwd='"+pwd+"';";		
				
			con.query(sql, function (err, rows, fields) {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			  });
			});
		});
	}
	getLastRecord(pseudo, pwd).then(function(rows){
		res.send(rows);
	});
		
});
router.post('/create/:pseudo/:pwd/:email', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = request.params.pwd;
	var email = request.params.email;
	function getLastRecord(pseudo,pwd, email)
	{
		return new Promise(function(resolve, reject) {
			// The Promise constructor should catch any errors thrown on
			// this tick. Alternately, try/catch and reject(err) on catch.
			
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

module.exports = router;
