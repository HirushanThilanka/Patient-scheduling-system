const express=require("express");
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.render('patient',{name:"kavinda",appointment:23});
});

module.exports=router;