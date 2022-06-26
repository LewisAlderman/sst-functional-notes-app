import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
	const result = await dynamoDb.query({
		TableName: process.env.TABLE_NAME as string,
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': event.requestContext.authorizer.iam.cognitoIdentity.identityId
		}
	});

	if (!result.Items?.length) {
		throw new Error("Items not found!")
	}

	return result.Items;
})