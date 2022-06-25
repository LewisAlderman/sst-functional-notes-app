import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
	const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
		TableName: process.env.TABLE_NAME as string,
		Key: {
			userId: "123",
			noteId: event.pathParameters!.noteId
		}
	};

	const result = await dynamoDb.get(params);

	if (!result.Item) {
		throw new Error("Item not found!")
	}

	return result.Item;
})