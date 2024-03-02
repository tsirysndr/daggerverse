import * as jobs from "./jobs.ts";

const { upload, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[], src);
    return;
  }

  await upload(
    src,
    Deno.env.get("ACCESS_KEY")!,
    Deno.env.get("SECRET_KEY")!,
    Deno.env.get("BUCKET")!,
    Deno.env.get("ENDPOINT_URL")!,
    Deno.env.get("REGION")
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
      Deno.env.get("ACCESS_KEY")!,
      Deno.env.get("SECRET_KEY")!,
      Deno.env.get("BUCKET")!,
      Deno.env.get("ENDPOINT_URL")!,
      Deno.env.get("REGION")
    );
  }
}
