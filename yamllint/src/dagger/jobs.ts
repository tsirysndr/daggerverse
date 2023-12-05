import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Lint Yaml files.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {Directory | string}
 */
export async function lint(
  src: Directory | string,
  path = "."
): Promise<Directory | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.lint)
      .container()
      .from("cytopia/yamllint")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([path]);

    await ctr.stdout();
    id = await ctr.directory("/app").id();
  });
  return id;
}

/**
 * @function
 * @description Returns a container with yamllint installed.
 * @param {string | Directory | undefined} src
 * @returns {Container | string}
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
      .from("cytopia/yamllint")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withEntrypoint(["/bin/sh"]);

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}

export type JobExec = (
  src: string,
  path?: string
) => Promise<Container | Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint Yaml files.",
  [Job.dev]: "Returns a container with yamllint installed.",
};
