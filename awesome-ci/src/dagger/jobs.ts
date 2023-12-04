import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  dev = "dev",
  gitConflicts = "gitConflicts",
  gitIgnored = "gitIgnored",
}

export const exclude = [];

/**
 * @function
 * @description Returns a container with awesome-ci installed.
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app");

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}

/**
 * @function
 * @description Scan files and check if they contain git conflicts.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function gitConflicts(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.gitConflicts)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["git-conflicts", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan git directory and see if ignored files are still in git cache.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function gitIgnored(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.gitConflicts)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["git-ignored", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

export type JobExec = (src?: string) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.dev]: dev,
  [Job.gitConflicts]: gitConflicts,
  [Job.gitIgnored]: gitIgnored,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.dev]: "Returns a container with awesome-ci installed.",
  [Job.gitConflicts]: "Scan files and check if they contain git conflicts.",
  [Job.gitIgnored]:
    "Scan git directory and see if ignored files are still in git cache.",
};
