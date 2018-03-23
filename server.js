const express = require('express');
const pSettle = require('p-settle');
var elasticsearch = require('elasticsearch');

//ELASTICSEARCH CLIENT
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});
//END CLIENT

//SERVER
const app = express();
const port = 9292;

app.listen(port, () => console.log(`Listening on port ${port}`));
//END SERVER

//API GET
app.get('/api/get', (req, res) => {
	console.log("API CALL GET");

	var req_query = req.query;
	console.log(req_query);

	var generated_query = generate_query(req_query);
	//query the database with the generated query
});
//END API GET

//FUNCTIONS

function generate_query(req_query){
	//generate the elasticsearch query based on the api request
	//return query
}

//END FUNCTIONS