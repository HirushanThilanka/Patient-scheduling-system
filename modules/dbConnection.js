const mysql=require('mysql');
var connection;
var pool ={
	host:"localhost",
	user:"root",
	password:"",
	database:"clinicdb"
}; 

function connectDatabase(){
	connection = mysql.createConnection(pool);
	connection.connect(function(err){
		if(!err){
			console.log("Database connected");	
		}else{
			console.log("Error database connection"); 
		}
	});
	return connection;
}

module.exports = connectDatabase();
