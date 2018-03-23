var client = require('./connection.js');

function create_index()
{
	client.indices.create({  
	  index: 'ottawa'},function(err,resp,status) {
	  if(err) {
	    console.log(err);
	  }
	  else {
	    console.log("create",resp);
	  }
	});
}

module.exports = create_index;