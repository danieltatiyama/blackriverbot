var Discord = require("discord.js");
var Moment = require("moment.js");
var mybot = new Discord.Client();
 
mybot.on("message", function(message){
	switch(message.content){
		case "ping":
			mybot.reply(message, "pong");
			break;
		case "$Logout":
			mybot.logout()
		case "uptime":
			var uptime = mybot.uptime
			mybot.sendMessage(message.channel, "I've been functioning for " + uptime );
		default:
			break;
	}

});

mybot.on("ready", function () {
	console.log("Ready to begin! Serving in " + mybot.channels.length + " channels");
});

mybot.login("danielhtatiyama@gmail.com", "testeblackriverbot");