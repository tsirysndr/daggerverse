import { env } from "../../deps.ts";
import * as jobs from "./jobs.ts";

const { build } = jobs;

export default async function pipeline(src = ".", _args: string[] = []) {
  await build(src, env.get("IMAGE_TAG")!);
}
