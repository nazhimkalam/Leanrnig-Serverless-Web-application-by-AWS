// POST a record

const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
	const tableName = 'StudentDetails';

	const params = {
		TableName: tableName,
		Item: {
			Id: event.Id,
			name: event.name,
			age: event.age,
		},
	};

	docClient.put(params, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, 'Successfully updated data');
		}
	});
};
