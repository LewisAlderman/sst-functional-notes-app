import * as IAM from 'aws-cdk-lib/aws-iam';
import {Auth, use, StackContext} from "@serverless-stack/resources"
import {StorageStack} from './StorageStack'
import {ApiStack} from './ApiStack'

export function AuthStack({stack, app}: StackContext) {
	const {bucket} = use(StorageStack)
	const {api} = use(ApiStack)

	const auth = new Auth(stack, "Auth", {
		login: ["email"]
	})

	auth.attachPermissionsForAuthUsers([
		api,
		new IAM.PolicyStatement({
			actions: ["s3:*"],
			effect: IAM.Effect.ALLOW,
			resources: [bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*"]
		})
	])
	
	stack.addOutputs({
		Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId!,
    UserPoolClientId: auth.userPoolClientId,
	})
	
	return {auth}
}
