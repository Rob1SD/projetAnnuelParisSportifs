var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/create/:pseudo/:pwd', function(req, res, next) {
var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});
	
  res.send('respond with a resource');
});

module.exports = router;
