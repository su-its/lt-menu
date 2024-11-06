import { createClient } from "@shizuoka-its/core";

export const client = createClient();

process.on("SIGTERM", async () => {
  await client.disconnect();
});
