/**
 * @module php-cs-fixer
 * @description This module provides a function to run php-cs-fixer on PHP files.
 */

import { dag, Directory, Container } from "../../deps.ts";
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
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.fix)
    .container()
    .from(`cytopia/php-cs-fixer:${tag}`)
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
  [Job.fix]: fix,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.fix]: "Run php-cs-fixer on PHP files.",
};
