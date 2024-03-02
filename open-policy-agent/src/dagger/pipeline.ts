import * as jobs from "./jobs.ts";

const { evaluate, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[]);
    return;
  }

  await evaluate(
    src,
    Deno.env.get("OPA_DATA")!,
    Deno.env.get("OPA_INPUT")!,
    Deno.env.get("OPA_QUERY")!
  );
}

async function runSpecificJobs(args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(
      ".",
      Deno.env.get("OPA_DATA")!,
      Deno.env.get("OPA_INPUT")!,
      Deno.env.get("OPA_QUERY")!
    );
  }
}
