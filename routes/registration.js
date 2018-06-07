const express=require('express');
const router=express.Router();

var emailError=false;
var passwordError=false;
var confirmPasswordError=false;

router.get('/',(request,respond)=>{
	respond.render('registerUser',{emailError:emailError,passwordError:passwordError,confirmPasswordError:confirmPasswordError});
	request.session.errors=null;
		
	emailError=false;
	passwordError=false;
	confirmPasswordError=false;
});
/*
router.get('/submit',(request,respond)=>{
	respond.render('registerUser',{errors:request.session.errors});
});
*/
router.post('/submit',(request,respond)=>{
	console.log("POST");
	
	request.check('email',"1").isEmail();//isLength({min:7});
	console.log(request.body.confirmPassword);
	console.log(request.body.password);
	if(request.body.password.length<8) {
		if (request.body.confirmPassword===request.body.password) {
			passwordError=true;
		}else{
			passwordError=true;
			confirmPasswordError=true;
		}
	}else {
		if(request.body.confirmPassword!=request.body.password){
			confirmPasswordError=true;
		}
	}

	
	var errors=request.validationErrors();
	
	if(errors){
		emailError=true;
	}

	if (!emailError&&!confirmPasswordError&&!passwordError) {
		console.log('Login Success');
	}else {
		request.session.errors=errors;
		respond.redirect('/registration');
	}
	
	
});

module.exports =router;