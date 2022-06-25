import {APIGatewayProxyHandlerV2} from "aws-lambda";

export default function handler (lambda: (...args: Parameters<APIGatewayProxyHandlerV2>) => any) {
	return async (...args: Parameters<APIGatewayProxyHandlerV2>) => {
		let body, statusCode;

		try {
			body = await lambda(...args);
			statusCode = 200;
		} catch (e: any) {
			console.error(e)
			body = {error: e.message}
			statusCode = 500;
		}

		return {statusCode, body: JSON.stringify(body)}
	}
}