// mongodb.js
// ========

var mongodb = require('mongodb');
var uri = 'mongodb://blackriverbot:blackriverbot@ds059682.mongolab.com:59682/blackriverbotdb';

module.exports = {
	insertMessage: function (message) {
		mongodb.MongoClient.connect(uri, function(err, db){
			if (err) {throw err};
			var messages = db.collection('messages');
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
			console.log(insertMessage);
			messages.insert(insertMessage, function(err, result){
				if(err) throw err;
				console.log("Gravei a mensagem rapá!");
			});
		});		
	},
	nadanadanada: function () {
		
	}
};