var express=require('express');
var router=express.Router();
var connection = require('../modules/dbConnection');


/* GET today date. */
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

today = yyyy + '-' + mm + '-' +dd;



router.get('/',function(req,res,next){
	var sql1="select count(reg_no) as pc from addmision";
	connection.query(sql1,function(err,rows1){
				if (err){
					throw err;
				} 
				else{

					if(rows1[0].pc > 0){
						console.log('counting successfully')
						var sql2="select * from patient inner join addmision on patient.reg_no = addmision.reg_no";
						connection.query(sql2,function(err,rows2){
						   if (err){
						      throw err;
				
					       }else{
	                          console.log('add patien list successfully');
						      res.render('doctor1',{count:rows1,patient:rows2,date:today});
						      
					       }

					    }); 
					 }else{
					 	console.log('Patient list is empty');
					 	res.send('Patient list is empty');
					 }     
				}	
	});	 
				

});	


module.exports =router;