/**
 * @module jsonlint
 * @description This module provides a function to lint JSON files.
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
 * @function
 * @description Lint JSON files.
 * @param {string | Directory | undefined} src
 * @param {string} files
 * @param {string} ignore
 * @returns {Directory | string}
 */
export async function lint(
  src: Directory | string,
  files = "*.json",
  ignore?: string
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const args = [];

  if (ignore) {
    args.push("-i", `'${ignore}'`);
  }
  const ctr = dag
    .pipeline(Job.lint)
    .container()
    .from("cytopia/jsonlint")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec([...args, files]);

  await ctr.stdout();
  return ctr.directory("/app").id();
}

export type JobExec =
  | ((
      src: string,
      files?: string,
      ignore?: string
    ) => Promise<Container | Directory | string>)
  | ((src: string) => Promise<Container | Directory | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint JSON files.",
};
