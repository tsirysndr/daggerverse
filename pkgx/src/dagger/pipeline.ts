import * as jobs from "./jobs.ts";

const { install, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], args as string[] & string);
    return;
  }

  await install(args);
}

async function runSpecificJobs(args: jobs.Job[], pkgsOrSrc: string[] & string) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(pkgsOrSrc);
  }
}
