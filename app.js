var Discord = require("discord.js");

var moment = require('moment');

var mybot = new Discord.Client();
var uptimesince = moment().format("DD/MM/YYYY - HH:mm:ss");
var uptimefor = moment().startOf('hour', uptimesince).fromNow();


mybot.on("message", function(message){
	switch(message.content){
		case "ping":
			mybot.reply(message, "pong");
			break;
		case "$Logout":
			mybot.logout()
		case "uptime":
			mybot.sendMessage(message.channel, "I've been functioning since " + uptimesince );
			var uptimefor = moment().startOf('minutes', uptimesince).fromNow();
			mybot.sendMessage(message.channel, "Which means I've been running ok for " + uptimefor );
		default:
			break;
	}

});

mybot.on("ready", function () {
	console.log("Ready to begin! Serving in " + mybot.channels.length + " channels");
});

mybot.login("danielhtatiyama@gmail.com", "testeblackriverbot");