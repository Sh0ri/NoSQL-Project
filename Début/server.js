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
	var i = 0;

	if(req_query!=={}){

		//		{ "match": { "title":  "War and Peace" }},
		//		{ "match": { "author": "Leo Tolstoy"   }}


		for(x in req_query){
			if(i == 0)
			{
				console.log("//////////////LE X //////////////////////////");
				//var str = '{"'+x+'":"'+req_query[x]+'"}';
				var str = '("'+x+'":"'+req_query[x]+'")';
				//var jsonobj = JSON.parse(str);
				var jsonobj = str;

				if(req_query[x+"Mode"] == 1)
				{	
					jsonobj = "NOT " + jsonobj;
					console.log(jsonobj);
				}

				must.push({"match":jsonobj})
				i = 1;
			}
			else
				i = 0;
		}

		query = {
			"bool": {
				"must": must
			}
		}
	}
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