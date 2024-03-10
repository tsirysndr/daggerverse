import * as jobs from "./jobs.ts";

const { plan } = jobs;

export default async function pipeline(src = ".", _args: string[] = []) {
  await plan(src);
}
