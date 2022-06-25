import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

export default {
	get: (...args: Parameters<typeof client.get>) => client.get(...args).promise(),
	put: (...args: Parameters<typeof client.put>) => client.put(...args).promise(),
	query: (...args: Parameters<typeof client.query>) => client.query(...args).promise(),
	update: (...args: Parameters<typeof client.update>) => client.update(...args).promise(),
	delete: (...args: Parameters<typeof client.delete>) => client.delete(...args).promise(),
}

