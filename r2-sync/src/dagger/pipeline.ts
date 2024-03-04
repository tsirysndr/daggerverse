import * as jobs from "./jobs.ts";
import { env } from "../../deps.ts";

const { upload, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], src);
    return;
  }

  await upload(
    src,
    env.get("ACCESS_KEY")!,
    env.get("SECRET_KEY")!,
    env.get("BUCKET")!,
    env.get("ENDPOINT_URL")!,
    env.get("REGION")
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
      env.get("ACCESS_KEY")!,
      env.get("SECRET_KEY")!,
      env.get("BUCKET")!,
      env.get("ENDPOINT_URL")!,
      env.get("REGION")
    );
  }
}
