'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var exec = require('child_process').exec, child;
var old_ip_addr = null;
var iface = 'en4'
var ip_addr = '';
var new_ip_addr = '';
var fs = require('fs');

function ValidateIPaddress(ipaddress) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
return (false)
}
const getIp = (a) => {
	 
	exec(`ifconfig ${iface}| grep inet|grep broadcast`,
    (error, stdout, stderr) =>{
	
		let lines = stdout.split(' ');
	
		on_ip_changed(lines[1]);

        if (error !== null) {
             
        }
    });
 
}

const onChangeIp=(o,n)=>{
	console.log('What we do on ip changed from '+o+' to '+n);
	ip_addr = old_ip_addr = new_ip_addr = n; 
}
const on_ip_changed =(ip_addr)=>{
	if(ValidateIPaddress(ip_addr)){

		

		fs.writeFile('ip_addr.txt', ip_addr, function (err) {
		  if (err) throw err;
		  console.log('Replaced!');
		});

		console.log('current ip address is :'+ip_addr)
		if(old_ip_addr == null){
			old_ip_addr = ip_addr;
		}
		if(ip_addr != old_ip_addr){
			onChangeIp(old_ip_addr, ip_addr);
		}
	}

	
}

setInterval(getIp,3000)