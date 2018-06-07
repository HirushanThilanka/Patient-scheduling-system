const express=require('express');
const router=express.Router();
const dbConnection=require('../modules/dbConnection');
const bcrypt=require('bcrypt');
const saltRound=10;

var loginError=false;
router.get('/',(request,respond,next)=>{
	respond.render('login',{errors:loginError});
	request.session.errors=null;
	loginError=false;
});
router.post('/login',(request,respond,next)=>{

	if(request.body.username.length==0 || request.body.password.length==0){
		loginError=true;
	}



	if(loginError==true){
		respond.redirect('/');
	}
	else{

		var user={
			username:request.body.username,
			password:request.body.password
			}

		var sql="select * from users where username="+dbConnection.escape(user.username);
		dbConnection.query(sql,(error,rows)=>{
			if(error) throw error;
			console.log(rows);
			if(rows.length!=0){
				if(bcrypt.compareSync(user.password,rows[0].password)){
					var regId=rows[0].registrationId;
					if(regId[0]=="s"){
						console.log("Staff");
						var sql2="select * from staff where staff_Id='"+regId+"'";
						dbConnection.query(sql2,(error,row)=>{
							if(error)throw error
							if(row[0].Designation=="Doctor"){
								console.log("Doctor");
								respond.redirect('/doctor1');
							}else if(row[0].Designation=="Administrator"){
								console.log("Administrator");
								respond.redirect('/admin/addStaff');
							}else if(row[0].Designation=="Receptionist"){
								console.log("Receptionist");
								respond.redirect('/receptionist')
							}else if(row[0].Designation=="Pharmacist"){
								console.log("Pharmacist");
								respond.redirect('/parmacist');
							}else if(row[0].Designation=="LabTechnician"){
								console.log("LabTechnician");
							}
						});
					}else{

						// patient admission date viwe
						console.log("Patient");
						var sql2="select * from patient where reg_no="+regId;

						dbConnection.query(sql2,(error,row1)=>{
							if(error)throw error;
							var name=row1[0].firstName+" "+row1[0].lastName;
							console.log(row1[0].firstName+" "+row1[0].lastName);
							var sql3="select * from appointment where reg_no="+regId;
							dbConnection.query(sql3,(error,row2)=>{
								if(error) throw error;

								console.log(row1);
								respond.render('patient',{name:name,appointment:row2});
							});
						});




					}
				}else{
					console.log('Invalid User');
					loginError=true;
					respond.redirect('/');
				}
			}else{
				loginError=true;
				respond.redirect('/');
			}


		});


	}


});

module.exports =router;
