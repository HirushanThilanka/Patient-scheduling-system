var express = require('express');
var router = express.Router();
var connection = require('../modules/dbConnection');
var firstNameError=false;
var lastNameError=false;
var regNoError=false;
var ageError=false;
var addressError=false;
var contactNoError=false;
const bcrypt=require('bcrypt');
const saltRound=10;
/* GET home page. */
const sms=require('../modules/sendSMS');

router.get('/', function(req, res,next) {
	res.render('patientRegister',{firstNameError:firstNameError,lastNameError:lastNameError,regNoError:regNoError,ageError:ageError,addressError:addressError,contactNoError:contactNoError});
	req.session.errors=null;
		
	firstNameError=false;
	lastNameError=false;
 	regNoError=false;
	ageError=false;
	addressError=false;
	contactNoError=false;
});



router.post('/regPatient',function(req, res,next){
	const patientdata = {

		firstName:req.body.firstName,
		lastName:req.body.lastName,
		type:req.body.type,
		reg_no:req.body.reg_no,
		age:req.body.age,
		gender:req.body.gender,
		address:req.body.address,
		tel_no:req.body.tel_no
		
	}
	if(patientdata.firstName.length==0){
		firstNameError=true;
	}
	if(patientdata.lastName.length==0){
		lastNameError=true;
	}
	if(patientdata.reg_no.length==0){
		regNoError=true;
	}
	if(patientdata.age.length==0){
		ageError=true;
	}
	if(patientdata.address.length==0){
		addressError=true;
	}
	if(patientdata.tel_no.length==0){
		contactNoError=true;
	}

	if(!firstNameError&&!lastNameError&&!regNoError&&!ageError&&!addressError&&!contactNoError){
		connection.query("INSERT INTO patient SET ?",patientdata,function(err,result){
			if(err)throw err;
			res.redirect('/receptionist');
		});
		var salt = bcrypt.genSaltSync(saltRound);
		var hash = bcrypt.hashSync(patientdata.reg_no, salt);
		var logInfo={username:patientdata.reg_no,password:hash,registrationId:patientdata.reg_no};
		connection.query('INSERT INTO users SET ?',logInfo,(error,result)=>{
			if(error)throw error;
			console.log(result);
		});
		user={
			username:patientdata.reg_no,
			password:patientdata.reg_no
		}
		sms.sendSMS(patientdata.tel_no,user);

	}else{
		req.session.errors=true;
		res.redirect('/receptionist');
	}
	

})


module.exports = router;
