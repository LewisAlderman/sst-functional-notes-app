import * as uuid from 'uuid';
import AWS from 'aws-sdk';
import dynamoDb from 'util/dynamodb';
import handler from 'util/handler';

export const main = handler(async (event) => {
	await dynamoDb.delete({
		TableName: process.env.TABLE_NAME as string,
		Key: {
			userId: "123",
			noteId: event.pathParameters!.noteId
		},
	});

	return { success: true };
})