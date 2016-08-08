var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var client = require('scp2');
var fs = require("fs");	
var title = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";	
fs.writeFile('temp_data.csv', title,  function(err) {
		   if (err) {
		       return console.error(err);
		   }		   
		});
app.post('/sub',function(req,res){
		res.set('Pragma', 'no-cache');
		res.set('Expires', '0');
		res.set('Content-Type', 'application/json');
		res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
		console.log(req.body);
	if(req.body=={})
	{
		res.end('no');
	}
	else
	{
		//var data = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";
		data = req.body.Address+","+req.body.Marketing_Optin==0?'N':'Y'+","+req.body.SubscriberKey +"\n";
			
		fs.appendFile('temp_data.csv', data,  function(err) {
		   if (err) {
		       return console.error(err);
		   }
		   else
		   {
		   	res.end('done!!');
		   }
		});
	}
});
app.get('/send',function(req,res){
		var now = new Date();
		var fileName='hccw2016_LiveTriggerFile.csv';///'Pinacolada2016_'+(now.getHours()>9?now.getHours():'0'+now.getHours())+(now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes())+'_'+(now.getUTCDate()>9?now.getUTCDate():'0'+now.getUTCDate())+'072016.csv';
console.log(fileName);
		fs.writeFileSync(fileName, fs.readFileSync('temp_data.csv'));
		var title = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";	
		fs.writeFile('temp_data.csv', title,  function(err) {
				   if (err) {
				       return console.error(err);
				   }else
{
	res.end('Done');
}		   
				});
		client.scp(fileName, {
			    host: 'ftp.s6.exacttarget.com',
			    username: '6287911',
			    password: 'T97*mb#SK1et',
			    path: '/Import/'
			}, function(err) {console.log('Error on adding file:', err);});
});

 setInterval(function(){ 
	var now = new Date();
		var fileName='hccw2016_LiveTriggerFile.csv';//'Pinacolada2016_'+(now.getHours()>9?now.getHours():'0'+now.getHours())+(now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes())+'_'+(now.getUTCDate()>9?now.getUTCDate():'0'+now.getUTCDate())+'072016.csv';
		fs.writeFileSync(fileName, fs.readFileSync('temp_data.csv'));
		var title = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";	
		fs.writeFile('temp_data.csv', title,  function(err) {
				   if (err) {
				       return console.error(err);
				   }		   
				});
		client.scp(fileName, {
			    host: 'ftp.s6.exacttarget.com',
			    username: '6287911',
			    password: 'T97*mb#SK1et',
			    path: '/Import/'
			}, function(err) {console.log('Error on adding file:', err);});
  console.log('The answer to life, the universe, and everything!');
 }, 1000*60*15);
app.listen(8000);
