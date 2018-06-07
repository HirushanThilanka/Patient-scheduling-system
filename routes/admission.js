var express = require('express');
var router = express.Router();
var connection = require('../modules/dbConnection');
var regNoError=false;

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



             

/* GET home page. */
/*router.get('/', function(req, res,next) {
	res.render('patientAdmission',{regNoError:regNoError});
	req.session.errors=null;

 	regNoError=false;
}
}
}
}


});*/
router.get('/', function(req, res, next) {
	var sql1="SELECT * from appointment WHERE date ='"+today+"'";

    connection.query(sql1,function (err, rows) {
    	console.log(rows);
         if (err)throw err;
		 	for(var row in rows){
		 		console.log(rows[row].reg_no)
		 		var patient={
		 			reg_no:rows[row].reg_no
		 		}
		 			connection.query("insert into waiting set?",patient,(error,result)=>{
		 				if(error)throw error;
		 			});

		 		}
		 		
		 	})

		 		
             

 var rowsWaiting;
 var addrow
connection.query('SELECT * FROM waiting',function(err,rows){
	if(err) throw error;
	rowsWaiting=rows;
	
}) 
connection.query('SELECT * FROM addmision',function(err,rows){
	if  (err) throw err;
	áddrow=rows;

 	res.render('patientAdmission', {admission:rows,regNoError:regNoError,waiting:rowsWaiting});
	req.session.errors=null;

 	regNoError=false;


});
});




router.post('/admPatient',function(req, res,next){
	const patientadmdata = {
		reg_no:req.body.reg_no

	}
	if(patientadmdata.reg_no.length==0){
		regNoError=true;
	}

	if(!regNoError){
		connection.query("INSERT INTO addmision SET ?",patientadmdata,function(err,result){
			if(err)throw err;
			res.redirect('/receptionist/admission');
		});
	}
	else{
		req.session.errors=true;
		res.redirect('/receptionist/admission');
	}
	

})


module.exports = router;
