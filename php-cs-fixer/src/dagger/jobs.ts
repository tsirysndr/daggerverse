import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  fix = "fix",
}

export const exclude = [];

/**
 * @function
 * @description Run php-cs-fixer on PHP files.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} tag
 * @returns {Directory | string}
 */
export async function fix(
  src: Directory | string,
  path = ".",
  tag = "latest"
): Promise<Directory | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.fix)
      .container()
      .from(`cytopia/php-cs-fixer:${tag}`)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([path]);

    await ctr.stdout();
    id = await ctr.directory("/app").id();
  });
  return id;
}
export type JobExec = (
  src: string,
  path?: string
) => Promise<Container | Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.fix]: fix,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.fix]: "Run php-cs-fixer on PHP files.",
};
