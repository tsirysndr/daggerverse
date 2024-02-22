/**
 * @module gofmt
 * @description This module provides a function to format Go code.
 */

import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  format = "format",
}

export const exclude = [];

/**
 * @function
 * @description Format Go code.
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
      .from(`cytopia/gofmt`)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["-d", "-w", path]);

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
  [Job.format]: format,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.format]: "Format Go code.",
};
