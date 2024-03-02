/**
 * @module gofmt
 * @description This module provides a function to format Go code.
 */

import { dag, Directory, Container } from "../../deps.ts";
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
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.format)
    .container()
    .from(`cytopia/gofmt`)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["-d", "-w", path]);

  await ctr.stdout();
  return ctr.directory("/app").id();
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
