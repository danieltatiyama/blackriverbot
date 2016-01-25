var Discord = require("discord.js");
 
var mybot = new Discord.Client();
 
mybot.on("message", function(message){
	switch(message.content){
		case "ping":
			mybot.reply(message, "pong");
			break;
		case "$Logout":
			mybot.logout()
		default:
			break;
	}

});

mybot.login("danielhtatiyama@gmail.com", "testeblackriverbot");