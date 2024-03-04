import * as jobs from "./jobs.ts";
import { env } from "../../deps.ts";

const { publish, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], src);
    return;
  }

  await publish(
    src,
    env.get("VERSION")!,
    env.get("REF")!,
    env.get("GH_TOKEN")!,
    env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN")!,
    env.get("ACTIONS_ID_TOKEN_REQUEST_URL")!,
    env.get("URL"),
    env.get("IGNORE_CONFLICTS") === "true"
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
      env.get("VERSION")!,
      env.get("REF")!,
      env.get("GH_TOKEN")!,
      env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN")!,
      env.get("ACTIONS_ID_TOKEN_REQUEST_URL")!,
      env.get("URL"),
      env.get("IGNORE_CONFLICTS") === "true"
    );
  }
}
