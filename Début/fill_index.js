var client = require('./connection.js');

function Fill_Index(index_name, index_path){

	//GET JSON FILE
	var obj = JSON.parse(fs.readFileSync(index_path));

	var compteur = 0;
	obj.data.forEach(function(row){
		
		if(compteur<1000){
			var id = row._id.$oid;
			
			delete row._id;

			client.index({  
				index: index_name,
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