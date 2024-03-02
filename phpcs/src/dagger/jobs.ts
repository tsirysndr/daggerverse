/**
 * @module phpcs
 * @description This module provides a function to run phpcs on PHP files.
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  check = "check",
}

export const exclude = [];

/**
 * @function
 * @description Run phpcs on PHP files.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} tag
 * @returns {Directory | string}
 */
export async function check(
  src: Directory | string,
  path = ".",
  tag = "latest"
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.check)
    .container()
    .from(`cytopia/phpcs:${tag}`)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec([path]);

  await ctr.stdout();
  return ctr.directory("/app").id();
}
export type JobExec = (
  src: string,
  path?: string
) => Promise<Container | Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.check]: check,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.check]: "Run phpcs on PHP files.",
};
