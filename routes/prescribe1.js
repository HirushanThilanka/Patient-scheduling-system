var express=require('express');
var router=express.Router();
var connection = require('../modules/dbConnection');
var PDF = require('pdfkit');
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



router.get('/send/:id',function(req,res,next){
    var reg_no = req.params.id;
	var sql="select * from medicine "; 
	connection.query(sql,function(err,rows){
		    if (err){
		    	throw err;
		    }else{
		       console.log(reg_no);	
		       res.render('prescribe1',{tablet:rows,reg_no});
		       
            }	
    });	
	
});	




router.post('/submit/:id',(req,res,next)=>{


    var reg_no = req.params.id;
    var pres = req.body.selected;
    var dec = req.body.description;

  

    var text = "DATE :"+today+"\nID : "+reg_no+"\n\nPRESCRIBES\n01. Aspirin 75 mg      : "+pres[0]+"\n02. Clopidogrel 75 mg      : "+pres[1]+"\n03. Dypiradoml 100 mg      : "+pres[2]+"\n04. Atovastatin 20 mg      : "+pres[3]+"\n05. Warfarin 5 mg      : "+pres[4]+"\n06. Ismn(SR) 30 mg      : "+pres[5]+"\n07. Ismn(SR) 60 mg      : "+pres[6]+"\n08. S/L GTN 20 tablets      : "+pres[7]+"\n09. Captopril 25 mg      : "+pres[8]+"\n10. Enalapril 2.5 mg      : "+pres[9]+"\n11. Losaratan 2.5 mg      : "+pres[10]+"\n12. Panadol      : "+pres[11]+"\n\n PRESCRIPTION\n"+dec+"";
		
    var sql="insert into prescription(reg_no,date,prescription) values("+reg_no+",'"+today+"','"+text+"')"; 
    connection.query(sql,function(err,rows){
		    if (err){
		    	throw err;
		    }else{
		       console.log('sucess');
               
                   
		          
            }	
    });	
  
});     

module.exports =router;	

