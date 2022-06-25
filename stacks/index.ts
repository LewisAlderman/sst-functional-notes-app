import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app
    .stack(StorageStack)
    .stack(ApiStack)
}
