import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function getPublishableKey({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id", "token", "title", "type"],
    filters: {
      type: "publishable",
    },
  });

  if (!data.length) {
    console.log("No publishable API key found. Run the seed script first.");
    return;
  }

  for (const key of data) {
    console.log(`\n  Title: ${key.title}`);
    console.log(`  Key:   ${key.token}`);
  }

  // Machine-readable output (used by deploy.sh)
  console.log(`\nPUBLISHABLE_KEY=${data[0].token}`);
}
