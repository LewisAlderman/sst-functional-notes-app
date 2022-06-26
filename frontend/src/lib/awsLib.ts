import { Storage } from "aws-amplify";
import config from "../config";

export async function s3Upload(file: File) {
	if (file.size > config.MAX_ATTACHMENT_SIZE) {
		throw new Error("File too large (limit: " + config.MAX_ATTACHMENT_SIZE + ")");
	}
	
  const filename = `${new Date().toISOString()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}