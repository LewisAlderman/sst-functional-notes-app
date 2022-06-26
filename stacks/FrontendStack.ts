import {ReactStaticSite, StackContext, use} from "@serverless-stack/resources";
import {ApiStack} from "./ApiStack";
import {AuthStack} from "./AuthStack";
import {StorageStack} from "./StorageStack";

export function FrontendStack({stack, app}: StackContext) {
	const {bucket} = use(StorageStack)
	const {api} = use(ApiStack)
	const {auth} = use(AuthStack)
	
	const site = new ReactStaticSite(stack, "ReactSite", {
		path: "frontend",
		environment: {
			REACT_APP_API_URL: api.customDomainUrl || api.url,
			REACT_APP_REGION: app.region,
			REACT_APP_BUCKET_NAME: bucket.bucketName,
			REACT_APP_USER_POOL_ID: auth.userPoolId,
			REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId!,
			REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
		}
	})

	stack.addOutputs({
		SiteUrl: site.url
	})
	
}