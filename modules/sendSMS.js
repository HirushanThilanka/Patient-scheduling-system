var auth='AC307b6c1aaf1fcfea41d7624fd298871b';
var token='897ca8d0620e294c05bfceb28eba48b1';

var client =require('twilio')(auth,token);

const sendSMS=(reciever,user)=>{
	client.messages.create({
		to:'+94'+reciever,
		from:'+16143357970',
		body:'NHS Diabetic Clinic username :'+user.username+',password :'+user.password
	},(error,data)=>{
		if(error)throw error;
		console.log(data);
	});
}

module.exports.sendSMS=sendSMS;