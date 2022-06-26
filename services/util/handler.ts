import {Handler, Context, APIGatewayProxyCallback, APIGatewayProxyEvent, Callback} from "aws-lambda";



export default function handler (lambda: Handler<APIGatewayProxyEvent>) {
	return async (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyCallback>) => {
		let body, statusCode;

		try {
			body = await lambda(event, context, callback);
			statusCode = 200;
		} catch (e: any) {
			console.error(e)
			body = {error: e.message}
			statusCode = 500;
		}

		return {
			statusCode,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-CREDENTIALS': true
			}
		}
	}
}