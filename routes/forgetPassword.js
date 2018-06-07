const express=require('express');
const router=express.Router();

router.get('/',(request,respond,next)=>{
	respond.render('forgetPassword',{error:true});
	request.session.errors=null;

});
router.post('/submit',(request,respond,next)=>{
	console.log(request.body.email);
	respond.redirect('/forgetPassword');
});

module.exports =router;