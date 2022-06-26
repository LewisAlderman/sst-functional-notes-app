import { Bucket, StackContext, Table } from "@serverless-stack/resources";

export function StorageStack({stack, app}: StackContext) {
	const bucket  = new Bucket(stack, "Uploads", {
		cors: [
			{
				maxAge: "1 day",
				allowedHeaders: ["*"],
				allowedMethods: ["GET", "PUT", "DELETE", "HEAD", "POST"],
				allowedOrigins: ["*"],
			}
		]
	});

	
	const table = new Table(stack, "Notes", {
		fields: {
			userId: "string",
			noteId: "string",
		},
		primaryIndex: {
			partitionKey: "userId",
			sortKey: "noteId",
		}
	})

	return {table, bucket}
}