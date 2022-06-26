import {ViteStaticSite, StackContext, use} from "@serverless-stack/resources";
import {ApiStack} from "./ApiStack";
import {AuthStack} from "./AuthStack";
import {StorageStack} from "./StorageStack";

export function FrontendStack({stack, app}: StackContext) {
	const {bucket} = use(StorageStack)
	const {api} = use(ApiStack)
	const {auth} = use(AuthStack)

	bucket.bucketArn
	
	const site = new ViteStaticSite(stack, "ViteSite", {
		path: "frontend",
		environment: {
			VITE_API_URL: api.customDomainUrl || api.url,
			VITE_REGION: app.region,
			VITE_BUCKET_NAME: bucket.bucketName,
			VITE_USER_POOL_ID: auth.userPoolId,
			VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId!,
			VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
		}
	})

	stack.addOutputs({
		SiteUrl: site.url
	})
	
}