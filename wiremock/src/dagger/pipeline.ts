import * as jobs from "./jobs.ts";

const { wiremock, runnableJobs } = jobs;

export default async function pipeline(
  mappings = ".",
  files = ".",
  args: string[] = []
) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], mappings, files);
    return;
  }

  await wiremock(mappings, files);
}

async function runSpecificJobs(
  args: jobs.Job[],
  mappings: string,
  files: string
) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(mappings, files);
  }
}
