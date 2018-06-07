const express=require('express');
const router=express.Router();
const dbConnection=require('../modules/dbConnection');

var numberAddError=false;
var medicineAddError=false;
var medicineRemoveError=false;

router.get('/',(request,respond,next)=>{
	var sql="SELECT * FROM medicine";
	dbConnection.query(sql,(error,result)=>{
		if (error)throw error;
		respond.render('medicine',{rows:result,numberAddError:numberAddError,medicineAddError:medicineAddError,medicineRemoveError:medicineRemoveError});
		request.session.error=null;
		numberAddError=false;
		medicineAddError=false;
		medicineRemoveError=false;
	});
	
})

router.post('/add',(request,respond,next)=>{
	var number=request.body.number;
	var medicine=request.body.medicine;
	if(number.length==0){
		numberAddError=true;
	}
	if (medicine.length==0) {
		medicineAddError=true;
	}
	if(!numberAddError&&!medicineAddError){
		var med={
			Number:parseInt(number),
			Tablet:medicine
		}
		dbConnection.query("insert into medicine set ?",med,(error,result)=>{
			if (error)throw error;

		})
	}
	respond.redirect('/admin/pharmacy');
})


module.exports =router;