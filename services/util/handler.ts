import {Handler, Context, APIGatewayProxyCallback, APIGatewayProxyEvent, Callback, APIGatewayProxyEventV2WithRequestContext, APIGatewayEventRequestContextV2WithAuthorizer} from "aws-lambda";

type UnknownObj = {[key: string]: unknown};
type IAMCognitoAuthorizer = {iam: {cognitoIdentity: {identityId: string}}};
type E<TAuthorizer extends UnknownObj> = APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2WithAuthorizer<TAuthorizer>>

export default function handler<TAuthorizerObj extends UnknownObj = IAMCognitoAuthorizer>(lambda: Handler<E<TAuthorizerObj>>) {
	return async (event: Parameters<typeof lambda>[0], context: Context, callback: Callback<APIGatewayProxyCallback>) => {
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