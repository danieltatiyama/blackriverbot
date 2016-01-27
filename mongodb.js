// mongodb.js
// ========

var mongodb = require('mongodb');
var uri = 'mongodb://blackriverbot:blackriverbot@ds059682.mongolab.com:59682/blackriverbotdb';

// Initialize connection once
mongodb.MongoClient.connect(uri, function(err, database) {
  if(err) throw err;
  db = database;
  messages = db.collection('messages');
});

module.exports = {
	insertMessage: function (message) {			
			var insertMessage = [
			{
				_id:       message.id,
				content:   message.content,
				timestamp: message.timestamp,
				author:{
					id:    message.author.id,
					name:  message.author.username
				},
				mentions:  message.mentions
			}
			];
			messages.insert(insertMessage, function(err, result){
				if(err) throw err;
			});
	},
	searchMessages: function (message, bot) {		
		var command = message.content.toLowerCase().split(' ')[0].substring(1);
		var suffix = message.content.substring(command.length + 2);

		console.log("A search has been prompted. Search term: " + suffix);
		console.log("Requestant: " + message.author.username);

		messages.find({"content": new RegExp(suffix, 'i') }).toArray(function(err, messages){
			if(err) throw err;
			switch(true){
				case (messages.length == 0):
				bot.sendMessage(message.channel, "The search got no results.");
				break;
				case (messages.length == 1):
				bot.sendMessage(message.channel, "Listing the only message containing the informed text:");
				bot.sendMessage(message.channel, messages[0].content);
				break;
				case (messages.length <= 10):
				bot.sendMessage(message.channel, "Listing " + messages.length + " messages containing the informed text:");
				setTimeout(function() {
					messages.forEach(function (msg) {
						bot.sendMessage(message.channel, msg.content);
					});
				}, 100);	
				break;					
				default:
				bot.sendMessage(message.channel, "Over 10 messages were found, so they won't be displayed. Try be a bit more specific with the text, or you can add more parameters to the search such as the user who sent the message. For more help type !help search.");
			}			
		});
		return;
	},
	recordMessage: function(message, bot){		
		var insertMessage = [
		{
			_id:       message.id,
			content:   message.content.substring(message.content.toLowerCase().split(' ')[0].substring(1).length + 2),
			timestamp: message.timestamp,
			author:{
				id:    message.author.id,
				name:  message.author.username
			}
		}
		];
		messages.insert(insertMessage, function(err, result){
			if(err) throw err;
			var answer = "Mensagem gravada.";
			if (!message.channel.isPrivate) {
				answer = message.author + ' - ' + answer;
			}
			bot.sendMessage(message.channel, answer);
		});
	},
	insertUser: function(bot, user){

	}
};