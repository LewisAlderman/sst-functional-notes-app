import { Api, use, StackContext } from "@serverless-stack/resources";
import {StorageStack} from './StorageStack';

export function ApiStack({stack, app}: StackContext) {
	const {table} = use(StorageStack);

	const api = new Api(stack, "Api", {
		defaults: {
			authorizer: "iam",
			function: {
				permissions: [table],
				environment: {
					TABLE_NAME: table.tableName,
					STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
				}
			}
		},
		routes: {
			"GET /check": "functions/check.main",
			"POST /notes": "functions/create.main",
			"GET /notes/{noteId}": "functions/get.main",
			"GET /notes": "functions/list.main",
			"PUT /notes/{noteId}": "functions/update.main",
			"DELETE /notes/{noteId}": "functions/delete.main",
			"POST /billing": "functions/billing.main",
		}
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	})

	return {api};
}
