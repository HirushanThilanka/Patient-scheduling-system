var express=require('express');
var router=express.Router();
var connection = require('../modules/dbConnection');
var fs = require('fs');


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



router.get('/send/:id', function(req, res, next) {
	var reg_no = req.params.id;
	var sql1="select * from patient inner join addmision on patient.reg_no = addmision.reg_no where patient.reg_no = "+reg_no;
    connection.query(sql1,function (err, rows1) {
         if (err){
		      throw err;
		 }else{
              var sql2="delete from addmision where reg_no = "+reg_no;
              connection.query(sql2,function (err, rows2) {
                    if (err){
		                throw err;
		            }else{
			            var sql3="select count(reg_no) as pc from addmision";
				        connection.query(sql3,function(err,rows3){
							if (err){
								throw err; 
							}else{ 
					 	       res.render('getpatient1',{data:rows1,count:rows3});
					 	       console.log('Sucess get the patient');
							}    
                       });

                    }
              });

         }        

    });               
                
});             
		
	         	      

router.post('/nextdate/:id',(req,res,next)=>{
      var reg_no = req.params.id;
      var sql1 = "select count(date) as countdate from appointment where date = '"+req.body.date+"'";
      connection.query(sql1,function(err,rows1){
		    if (err){
		        throw err;
		    }else{
		    	if(rows1[0].countdate > 1){
		    		console.log('The date is full..Please select another date');
                    res.send('The date is full..Please select another data');   
		        }else{
                    var sql2 = "insert into appointment(reg_no,date) values("+reg_no+",'"+req.body.date+"')";
                    connection.query(sql2,function(err,rows2){
		                if (err){
		                    throw err;
			
		                }else{
                             console.log('add date successfully');
			                 res.redirect('/doctor1');
		                }
		            });
		        }
		    }
	   });	                
		    
});




module.exports =router;	

