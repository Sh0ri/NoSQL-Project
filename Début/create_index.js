var client = require('./connection.js');

function create_index(index_name)
{
	client.indices.create({  
	  index: 'index_name'},function(err,resp,status) {
	  if(err) {
	    console.log(err);
	  }
	  else {
	    console.log("create",resp);
	  }
	});
}

module.exports = create_index;