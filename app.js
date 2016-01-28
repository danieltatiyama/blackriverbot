var Discord = require("discord.js");
var mybot = new Discord.Client();
var moment = require('moment');
var mongo = require('./mongodb'); // Arquivo Customizado
var uptimesince = moment().format("DD/MM/YYYY - HH:mm:ss");

mybot.on("message", function(message){
	switch(message.content){
		case "$ping":
		mybot.reply(message, "pong");
		mongo.insertMessage(message);
		break;
		case "$logout":
		mybot.logout()
		case "$uptime":
		mybot.sendMessage(message.channel, "I've been functioning since " + uptimesince );
		var uptimefor = moment().startOf('minutes', uptimesince).fromNow();
		setTimeout(function() {
			mybot.sendMessage(message.channel, "In other words, I've been on since a " + uptimefor );
		}, 1000);	
		break;
		default:
		if(message.content.indexOf("$search") > -1 && message.author.username != mybot.user.username) {
			mongo.searchMessages(message, mybot);
		}
		if(message.content.indexOf("recordmessage") > -1){
			mongo.recordMessage(message, mybot);
		}
		break;
	}
});

mybot.on("ready", function () {
	console.log("Ready to begin! Serving in " + mybot.channels.length + " channels");
	// console.log("Channels I'm working on:");
	// for (var i = mybot.channels.length - 1; i >= 0; i--) {
	// 	console.log(mybot.channels[i].name);
	// };
});

mybot.login("danielhtatiyama@gmail.com", "testeblackriverbot");

//