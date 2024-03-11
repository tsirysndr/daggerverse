import * as jobs from "./jobs.ts";

const { lint, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], src);
    return;
  }

  await lint(src);
}

async function runSpecificJobs(args: jobs.Job[], src: string) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(src);
  }
}
