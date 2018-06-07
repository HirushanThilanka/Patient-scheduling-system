const express =require('express');
const app=express();
const path=require('path');
const login=require('./routes/login');
const registration=require('./routes/registration');
const forgetPassword=require('./routes/forgetPassword');
const admin=require('./routes/admin');
const registerPatient=require('./routes/registerPatient');
const admission=require('./routes/admission');
const addStaff=require('./routes/addStaff');
const medicine=require('./routes/medicine');
const bodyParser=require('body-parser');
const expressSession =require('express-session');
const expressValidator=require('express-validator');
const flash=require('connect-flash');
const doctor1=require('./routes/doctor1');
const getpatient1=require('./routes/getpatient1');
const prescribe1=require('./routes/prescribe1');
const patient=require('./routes/patient');
const PDF = require('pdfkit');
const fs = require('fs');

var auth='AC307b6c1aaf1fcfea41d7624fd298871b';
var token='897ca8d0620e294c05bfceb28eba48b1';

var client =require('twilio')(auth,token);

const port =8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/js',express.static(__dirname+'/assets/js'));
app.use('/css',express.static(__dirname+'/assets/css'));
app.use('/fonts',express.static(__dirname+'/assets/fonts'));
app.use('/images',express.static(__dirname+'/assets/images'));
app.use('/pdf', express.static(__dirname + '/pdf-files/pdf'));

app.use(expressValidator());
app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));
app.use(bodyParser.json());




app.get('/sms',(req,res)=>{
	client.messages.create({
		to:'+94772950076',
		from:'+16143357970',
		body:'Hello from Kavinda'
	},(error,data)=>{
		if(error)
			console.log(error);
		console.log(data);
	});
});

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',login);
app.use('/registration',registration);
app.use('/receptionist',registerPatient);
app.use('/admin',admin);
app.use('/admin/addStaff',addStaff);
app.use('/admin/pharmacy',medicine);
app.use('/receptionist',registerPatient);
app.use('/receptionist/admission',admission);
app.use('/doctor1',doctor1);
app.use('/doctor1/getpatient1',getpatient1);
app.use('/doctor1/getpatient1/prescribe1',prescribe1);
app.use('/patient',patient);

app.listen(port,()=>{
	console.log('Server running at port :'+port);
});