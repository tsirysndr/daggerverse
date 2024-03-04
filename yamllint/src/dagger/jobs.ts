/**
 * @module yamllint
 * @description This module provides a function to lint Yaml files.
 */
import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
 * Lint Yaml files
 *
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
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.lint)
    .container()
    .from("cytopia/yamllint")
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
  [Job.lint]: lint,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint Yaml files.",
};
