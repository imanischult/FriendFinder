const friends = require('../data/friends.js');

module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		let userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		let userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		let matchName = '';
		let matchImage = '';
		let totalDifference = 10000; 

		for (let i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			let diff = 0;
			for (let j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		friends.push(userInput);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};