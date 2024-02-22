/**
 * @module black
 * @description This module provides a set of functions to format Python code with black and to create a development environment with black installed.
 */

import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  format = "format",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Format Python code with black.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {Directory | string}
 */
export async function format(
  src: Directory | string,
  path = "."
): Promise<Directory | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.format)
      .container()
      .from("cytopia/black")
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
 * @description Returns a container with black installed.
 * @param {string | Directory | undefined} src
 * @returns {Container | string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("cytopia/black")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withEntrypoint(["/bin/ash"]);

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
  [Job.format]: format,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.format]: "Format Python code with black",
  [Job.dev]: "Returns a container with black installed.",
};
