import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';
import {APIGatewayEvent} from 'aws-lambda';

export const main = async (event: APIGatewayEvent) => {
	return {
		statusCode: 200,
		body: event
	}
}