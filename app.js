var Discord = require("discord.js");

var moment = require('moment');

var mongodb = require('mongodb');
var uri = 'mongodb://blackriverbot:blackriverbot@ds059682.mongolab.com:59682/blackriverbotdb';


var mybot = new Discord.Client();
var uptimesince = moment().format("DD/MM/YYYY - HH:mm:ss");



mybot.on("message", function(message){
	switch(message.content){
		case "ping":
		mybot.reply(message, "pong");
		mongodb.MongoClient.connect(uri, function(err, db){
			if (err) {throw err};
			var messages = db.collection('messages');
			var insertMessage = [
			{
				id:      message.id,
				content: message.content,
			}
			];
			console.log(insertMessage);
			messages.insert(insertMessage, function(err, result){
				if(err) throw err;
				console.log(result);
			});
		});
		break;
		case "$Logout":
		mybot.logout()
		case "uptime":
		mybot.sendMessage(message.channel, "I've been functioning since " + uptimesince );
		var uptimefor = moment().startOf('minutes', uptimesince).fromNow();
		setTimeout(function() {
			mybot.sendMessage(message.channel, "In other words, I've been on since a " + uptimefor );
		}, 1000);			
		default:
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