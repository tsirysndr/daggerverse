/**
 * @module megalinter
 * @description This module provides a function to lint files using megalinter.
 */
import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
 * Lint files
 *
 * @function
 * @description Lint files.
 * @param {string | Directory | undefined} src
 * @returns {Directory | string}
 */
export async function lint(
  src: Directory | string
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.lint)
    .container()
    .from("oxsecurity/megalinter:v7")
    .withDirectory("/app", context)
    .withWorkdir("/app");

  await ctr.stdout();
  return ctr.directory("/app/megalinter-reports").id();
}
export type JobExec = (
  src: string,
  path?: string
) => Promise<Container | Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint files.",
};
