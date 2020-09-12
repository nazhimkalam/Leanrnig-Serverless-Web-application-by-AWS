// UPDATE all

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = function (event, context, callback) {
	const Id = event.Id;
	const Sname = event.Sname;
	const age = event.age;

	const tableName = 'StudentDetails';

	const params = {
		TableName: tableName,
		Key: {
			"Id": Id,
		},
		
		UpdateExpression: 'set age=:p, Sname = :r',
		ExpressionAttributeValues: {
			':r': Sname,
			':p': age,
		},
		ReturnValues: 'UPDATED_NEW',
	};

	docClient.update(params, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, 'Successfully updated the data');
		}
	});
};
