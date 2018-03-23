var elasticsearch = require('elasticsearch');
var fs = require('fs');

//ELASTICSEARCH CLIENT
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

//Create_Index("ottawa");
//Delete_Index("ottawa");
//Fill_Index("ottawa");
//Get_All("ottawa");
//First_Simple_Query();
//Second_Simple_Query();
//First_Complex_Query();
//Second_Complex_Query();
//Hard_Query();

function Delete_Index(name){

	client.indices.delete({index: name},function(err,resp,status) {  
		console.log("delete",resp);
	});
}

function Create_Index(name){
	client.indices.create({
		index: name
	}, function(err, resp, status) {
		if (err) {
			console.log(err);
		} else {
			console.log("create", resp);
		}
	});
}

function Fill_Index(name){

	//GET JSON FILE
	console.log("//////////////////DEBUT////////////////////");
	var obj = JSON.parse(fs.readFileSync('permits_ottawa.json'));
	console.log("///////////////FIN//////////////////////");

	var compteur = 0;
	obj.data.forEach(function(row){
		
		if(compteur<1000){
			var id = row._id.$oid;
			
			delete row._id;

			client.index({  
				index: name,
				id: id,
				type: 'ottawa_permits',
				body: row
			},function(err,resp,status) {
				console.log(resp);
			});
			compteur++;
		}
		
	})
	console.log("Compteur : ");
	console.log(compteur);
}

function Get_All(name){
	var query = {match_all:{}};

	client.search({
		index: name,
		type: 'ottawa_permits',
		size: 10000,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log(body.hits.hits);
	}, function (err) {
		console.log(err.message);
	});
}

function First_Simple_Query(){
	//First Easy Query : select housenumber, road from ottawa_permits limit 10

	var query = {match_all:{}};

	var size = 10;

	client.search({
		index: "ottawa",
		type: 'ottawa_permits',
		size: size,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log("First Easy Query : select housenumber, road from ottawa_permits limit 10");

		body.hits.hits.forEach(function(elem){

			console.log(elem._source.housenumber);
			
			console.log(elem._source.road);
		})

	}, function (err) {
		console.log(err.message);
	});

}
function Second_Simple_Query(){
	//Second Easy Query : select municipality from ottawa_permits where year = 2011 LIMIT 10 

	var query = {
		"bool": {
			"must": { "match": { "year":  2011 }}
		}
	}

	var size = 10;

	client.search({
		index: "ottawa",
		type: 'ottawa_permits',
		size: size,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log("Second Easy Query : select municipality from ottawa_permits where year = 2011 LIMIT 10");

		body.hits.hits.forEach(function(elem){
			console.log(elem._source.municipality);
		})

	}, function (err) {
		console.log(err.message);
	});
}
function First_Complex_Query(){
	//First Complex Query : SELECT permits.filename from ottawa_permits where month='July' limit 10

	var query = {
		"bool": {
			"must": { "match": { "month":  "July" }}
		}
	}

	var size = 10;

	client.search({
		index: "ottawa",
		type: 'ottawa_permits',
		size: size,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log("First Complex Query : SELECT permits.filename from ottawa_permits where month='July' limit 10");

		body.hits.hits.forEach(function(elem){
			console.log(elem._source.permits.filename);
		})

	}, function (err) {
		console.log(err.message);
	});
}
function Second_Complex_Query(){
	//Second Complex Query : select id, municipality, permits.contractor from ottawa_permits where housenumber > 500 LIMIT 10

	var query = {
		"bool": {
			"must": { "match_all": {} },
			"filter": {
				"range": {
					"housenumber": {
						"gte": 500
					}
				}
			}
		}
	}

	var size = 10;

	client.search({
		index: "ottawa",
		type: 'ottawa_permits',
		size: size,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log("Second Complex Query : select id, municipality, permits.contractor from ottawa_permits where housenumber > 500 LIMIT 10");

		body.hits.hits.forEach(function(elem){
			console.log(elem._id);
			console.log(elem._source.municipality);
			console.log(elem._source.permits.CONTRACTOR);
			console.log();
		})

	}, function (err) {
		console.log(err.message);
	});
}
function Hard_Query(){
	//select permits.contractor, municipality from ottawa_permits where year = 2011 and month = July and housenumber > 500 limit 20 

	var query = {
		"bool": {
			"must": { "match": { "month":  "July" }, "match": { "year": "2011" } },
			"filter": {
				"range": {
					"housenumber": {
						"gte": 500
					}
				}
			}
		}
	}

	var size = 20;

	client.search({
		index: "ottawa",
		type: 'ottawa_permits',
		size: size,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log("Hard Query : select permits.contractor, municipality from ottawa_permits where year = 2011 limit 20 ");

		body.hits.hits.forEach(function(elem){
			console.log(elem._source.municipality);
			console.log(elem._source.permits.CONTRACTOR);
			console.log();
		})

	}, function (err) {
		console.log(err.message);
	});
}


function Get(name,query,size){

	client.search({
		index: name,
		type: 'ottawa_permits',
		size: size,
		body: {
			query: query
		}
	}).then(function (body) {
		console.log(body.hits.hits);
	}, function (err) {
		console.log(err.message);
	});
}

module.exports = {
	Create_Index : Create_Index,
	Delete_Index : Delete_Index,
	Fill_Index : Fill_Index,
	First_Simple_Query : First_Simple_Query,
	Second_Simple_Query: Second_Simple_Query,
	First_Complex_Query: First_Complex_Query,
	Hard_Query:Hard_Query,
	Get_All: Get_All,
	Get: Get,
};

