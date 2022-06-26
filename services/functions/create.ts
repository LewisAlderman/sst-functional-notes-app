import * as uuid from 'uuid';
import AWS from 'aws-sdk';
import dynamoDb from 'util/dynamodb';
import handler from 'util/handler';

export const main = handler(async (event) => {
	const data = JSON.parse(event.body!);

	const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
		TableName: process.env.TABLE_NAME as string,
		Item: {
			userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			createdAt: new Date().toISOString()
		}
	}

	await dynamoDb.put(params);

	return params.Item;
})