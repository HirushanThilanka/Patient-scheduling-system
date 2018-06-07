
const express=require('express');
const router=express.Router();
const dbConnection=require('../modules/dbConnection');
const bcrypt=require('bcrypt');
const saltRound=10;


var idError=false;
var firstNameError=false;
var lastNameError=false;
var emailError=false;
var contactNoError=false;
var usernameError=false;
var	passwordError=false;
var	confirmPasswordError=false;
const sms=require('../modules/sendSMS');

router.get('/',(request,respond,next)=>{
	respond.render('addStaff',{idError:idError,firstNameError:firstNameError,lastNameError:lastNameError,emailError:emailError,contactNoError:contactNoError,usernameError:usernameError,passwordError:passwordError,confirmPasswordError:confirmPasswordError});
	request.session.errors=null;
	idError=false;
	firstNameError=false;
	lastNameError=false;
	emailError=false;
	contactNoError=false;
	usernameError=false;
	passwordError=false;
	confirmPasswordError=false;
	
});

router.post('/submit',(request,respond,next)=>{
	var user={
		id:request.body.id,
		firstName:request.body.firstName,
		lastName:request.body.lastName,
		email:request.body.email,
		tele:request.body.contactNo,
		designation:request.body.designation,
		username:request.body.username,
		password:request.body.password,
		confirmPassword:request.body.confirmPassword

	}
	if (user.id.length==0 || user.id[0]!="s") {
		idError=true;
	}
	if(user.firstName.length==0){
		firstNameError=true;
	}
	if (user.lastName.length==0) {
		lastNameError=true;
	}
	request.check('email',"1").isEmail();
	var errors=request.validationErrors();
	
	if(errors){
		emailError=true;
	}
	if(user.tele.length==0){
		contactNoError=true;
	}
	if(user.username.length==0){
		usernameError=true;
	}
	if (user.password.length<8) {
		passwordError=true;
	}
	if(user.confirmPassword!=user.password){
		confirmPasswordError=true;
	}
	if(!idError&&!firstNameError&&!lastNameError&&!emailError&&!contactNoError&&!usernameError&&!passwordError&&!confirmPasswordError){
		//var sql="insert into staff values("+user.id+","+user.firstName+","+user.lastName+","+user.email+","+parseInt(user.tele)+","+user.designation+")";
		var staff={staff_Id:user.id,firstName:user.firstName,lastName:user.lastName,email:user.email,contactNo:parseInt(user.tele),Designation:user.designation};
		dbConnection.query('INSERT INTO staff SET ?',staff,(error,result)=>{
			if(error)throw error;
			console.log(result);
		});
		var salt = bcrypt.genSaltSync(saltRound);
		var hash = bcrypt.hashSync(user.password, salt);
		var logInfo={username:user.username,password:hash,registrationId:user.id};
		dbConnection.query('INSERT INTO users SET ?',logInfo,(error,result)=>{
			if(error)throw error;
			console.log(result);
		});
		userNew={
			username:user.username,
			password:user.password
		}
		sms.sendSMS(user.tele,userNew);
		
		respond.redirect('/admin/addStaff');
	}else{
		request.session.errors=errors;
		respond.redirect('/admin/addStaff');
	}
});

module.exports =router;