// POST a record

const AWS = require('aws-sdk');
const docClient =  new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
	const tableName = 'StudentDetails';

	const params = {
		TableName: tableName,
		Item: {
			Id: event.Id,
			Sname: event.Sname,
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
