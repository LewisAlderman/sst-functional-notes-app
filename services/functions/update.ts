import * as uuid from 'uuid';
import AWS from 'aws-sdk';
import dynamoDb from 'util/dynamodb';
import handler from 'util/handler';

export const main = handler(async (event) => {
	const data = JSON.parse(event.body!);

	await dynamoDb.update({
		TableName: process.env.TABLE_NAME as string,
		Key: {
			userId: "123",
			noteId: event.pathParameters!.noteId
		},
		UpdateExpression: 'SET content = :content, attachment = :attachment',
		ExpressionAttributeValues: {
			':content': data.content,
			':attachment': data.attachment
		},
		ReturnValues: 'ALL_NEW'
	});

	return { success: true };
})