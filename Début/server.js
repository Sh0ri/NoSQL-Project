const express = require('express');

var client = require('./connection.js');
var search = require('./search.js');

const app = express();
const port = 9292;


async function perform_match_query(res,req_query){

	//{ brand: 'BOLLORE', name: 'tamer' }

	//DEFAULT QUERY
	var query = {match_all:{}};
	var must = [];
	var must_not = [];
	var should = [];
	var filter = [];

	var i = 0;

	if(req_query!=={}){

		//		{ "match": { "title":  "War and Peace" }},
		//		{ "match": { "author": "Leo Tolstoy"   }}


		for(x in req_query){
			if(i == 0)
			{
				console.log("//////////////LE X //////////////////////////");
				//var str = '{"'+x+'":"'+req_query[x]+'"}';

				console.log(x + " : " + req_query[x] + " - Mode : " + req_query[x+"Mode"]);


		/*		if(req_query[x+"Mode"] == 3)
				{
						
						var str = '{"'+x+'":'+ '{"gt":' +req_query[x]+'}}';
						var jsonobj = JSON.parse(str);	
						console.log(jsonobj);
						filter.push({"range": jsonobj})
				}*/

				switch(req_query[x+"Mode"]) {

					case "0" : // MUST
						var str = '{"'+x+'":"'+req_query[x]+'"}';
						var jsonobj = JSON.parse(str);
						must.push({"match":jsonobj})
						console.log("MUST DONE");
					break;

					case "1" : // MUST_NOT
						var str = '{"'+x+'":"'+req_query[x]+'"}';
						var jsonobj = JSON.parse(str);
						must_not.push({"match":jsonobj})
					break;

					case "2" : // SHOULD
						var str = '{"'+x+'":"'+req_query[x]+'"}';
						var jsonobj = JSON.parse(str);
						should.push({"match":jsonobj})
						console.log("SHOULD DONE");
					break;

					case "3" : // FILTER >
						var str = '{"'+x+'":'+ '{"gt":' +req_query[x]+'}}';
						var jsonobj = JSON.parse(str);
						console.log("FILTER GT DONE");
						filter.push({"range": jsonobj})
					break;

					case "4" : // FILTER >=
						var str = '{"'+x+'":'+ '{"gte":' +req_query[x]+'}}';
						var jsonobj = JSON.parse(str);
						console.log("FILTER GTE DONE");
						filter.push({"range": jsonobj})
					break;

					case "5" : // FILTER <
						var str = '{"'+x+'":'+ '{"lt":' +req_query[x]+'}}';
						var jsonobj = JSON.parse(str);
						console.log("FILTER LT DONE");
						filter.push({"range": jsonobj})
					break;

					case "6" : // FILTER <=
						var str = '{"'+x+'":'+ '{"lte":' +req_query[x]+'}}';
						var jsonobj = JSON.parse(str);
						console.log("FILTER LTE DONE");
						filter.push({"range": jsonobj})
					break;

				}

				i = 1;
			}
			else
				i = 0;
		}

		query = {
			"bool": {
				"must": must,
				"must_not": must_not,
				"should": should,
				"filter":filter
			}
		}
	}

	//console.log(query);
	res.send(query);

	/*client.search({
		index: 'ottawa',
		type: 'ottawa_permits',
		size: 200,
		body: {
			query: query
		}
	}).then(function (body) {
		res.send(body.hits.hits);
	}, function (err) {
		res.send(err.message);
	});*/
}

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/search', (req, res) => {
	console.log("Searching");

	perform_match_query(res,req.query);
});

app.listen(port, () => console.log(`Listening on port ${port}`));