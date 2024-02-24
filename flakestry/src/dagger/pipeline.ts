import * as jobs from "./jobs.ts";

const { publish, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], src);
    return;
  }

  await publish(
    src,
    Deno.env.get("VERSION")!,
    Deno.env.get("REF")!,
    Deno.env.get("GH_TOKEN")!,
    Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN")!,
    Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_URL")!,
    Deno.env.get("URL"),
    Deno.env.get("IGNORE_CONFLICTS") === "true"
  );
}

async function runSpecificJobs(args: jobs.Job[], src: string) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(
      src,
      Deno.env.get("VERSION")!,
      Deno.env.get("REF")!,
      Deno.env.get("GH_TOKEN")!,
      Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN")!,
      Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_URL")!,
      Deno.env.get("URL"),
      Deno.env.get("IGNORE_CONFLICTS") === "true"
    );
  }
}
