const express=require('express');
const router=express.Router();

router.get('/',(request,respond,next)=>{
	respond.render('adminDashboard');
});

module.exports =router;