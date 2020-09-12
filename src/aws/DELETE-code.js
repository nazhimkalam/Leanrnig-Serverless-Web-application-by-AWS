// DELETE all

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
	const Id = event.Id;
	const tableName = 'StudentDetails';

	const params = {
		TableName: tableName,
		Key: {
			Id: Id,
		},
	};

	docClient.delete(params, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, 'Successfully deleted the data');
		}
	});
};
