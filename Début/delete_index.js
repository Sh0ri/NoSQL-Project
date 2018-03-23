var client = require('./connection.js');

function delete_index(){
	client.indices.delete({index: 'ottawa'},function(err,resp,status) {  
	  console.log("delete",resp);
	});
}

module.exports = delete_index;