var express = require('express');
var router = express.Router();
// var request=require('request')
var request=require('request-then')
var html2json = require('html2json').html2json;
var json2html = require('html2json').json2html;
var async = require('async');

/* GET users listing. */
router.get('/', function(req, res, next) {
	request('http://www.foot-national.com/partage.php?type=3&id=118').then(function(response){
		var cpt=0;
		var body = response["body"];
		var result = "{";
		var bodyToJSON = html2json(body);
		var tableauScore = bodyToJSON.child["0"].child;
		var sizeTableauScore=tableauScore.length
		for (var i = 0; i < sizeTableauScore; ++i)
		{
			
			var currChild=tableauScore[i].child;
			if (currChild)
			{
				var sizeChild=currChild.length
				var res1 = ""
				if (currChild[2])
				{
					if (currChild[2].child)
					{	
						result+='"child'+cpt+'":{'
						result+='"date":"'+currChild[2].child["0"].text+'",'
						result+='"match":"'+currChild[4].child["1"].child["0"].text+'",'
						result+='"score":"'+currChild[5].child["0"].child["0"].text+'"'
						result+="},"
						++cpt;
						//res1+=currChild[2].child["0"].text + "    " + currChild[4].child["1"].child["0"].text+ "    " + currChild[5].child["0"].child["0"].text
					}
				}
				//result+=res1+'\n'

			}


		}
		result=result.substring(0, result.length - 1)
		result+="}"
		result=JSON.parse(result);
		res.send(result);
		// return result;
	})
	
});

module.exports = router;
