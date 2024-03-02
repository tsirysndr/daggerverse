/**
 * @module golint
 * @description This module provides a function to lint Go code.
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
 * @function
 * @description Lint Go code.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {Directory | string}
 */
export async function lint(
  src: Directory | string,
  path = "."
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.lint)
    .container()
    .from(`cytopia/golint`)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["-set_exit_status", path]);

  await ctr.stdout();
  return ctr.directory("/app").id();
}
export type JobExec = (
  src: string,
  path?: string
) => Promise<Container | Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint Go code.",
};
