/**
 * @module checkmake
 * @description This module provides a function to lint Makefiles
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
 * Lint Makefiles
 *
 * @function
 * @description Lint Makefiles.
 * @param {string | Directory | undefined} src
 * @param {string} files
 * @returns {Directory | string}
 */
export async function lint(
  src: Directory | string,
  files = "Makefile"
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.lint)
    .container()
    .from("cytopia/checkmake")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec([files]);

  await ctr.stdout();
  return ctr.directory("/app").id();
}

export type JobExec =
  | ((src: string, files?: string) => Promise<Container | Directory | string>)
  | ((src: string) => Promise<Container | Directory | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint Makefiles",
};
