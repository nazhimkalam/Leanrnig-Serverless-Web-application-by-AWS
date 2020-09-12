// GET all 

const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = function (event, context, callback) {
	const scanningParams = {
		// linking to the table name
		TableName: 'StudentDetails',
	};

	client.scan(scanningParams, function (err, data) {
		// scanning

		if (err) {
			// if error then send null as data and the err message
			callback(err, null);
		} else {
			// if no error then send the data Items and make err as null for the callback
			callback(null, data.Items);
		}
	});
};
