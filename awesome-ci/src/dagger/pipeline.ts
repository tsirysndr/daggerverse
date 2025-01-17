import * as jobs from "./index.ts";
import { runnableJobs } from "./jobs/desc.ts";
import { Job } from "./jobs/mod.ts";

const { dev } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as Job[], args as string[] & string);
    return;
  }

  await dev(src);
}

async function runSpecificJobs(args: Job[], pkgsOrSrc: string[] & string) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(pkgsOrSrc);
  }
}
