/**
 * @module kubeval
 * @description This module provides a function to lint Kubernetes files and to create a development environment with kubeval installed.
 */
import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Lint Kubernetes files.
 * @param {string | Directory | undefined} src
 * @param {string} files
 * @returns {Directory | string}
 */
export async function lint(
  src: Directory | string,
  files = "*.yml"
): Promise<Directory | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.lint)
    .container()
    .from("cytopia/kubeval")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec([files]);

  await ctr.stdout();
  return ctr.directory("/app").id();
}

/**
 * @function
 * @description Returns a container with kubeval installed.
 * @param {string | Directory | undefined} src
 * @returns {Container | string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.dev)
    .container()
    .from("cytopia/kubeval")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withEntrypoint(["/bin/sh"]);

  await ctr.stdout();
  return ctr.id();
}

export type JobExec =
  | ((src: string, files?: string) => Promise<Container | Directory | string>)
  | ((src: string) => Promise<Container | Directory | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint Kubernetes files.",
  [Job.dev]: "Returns a container with kubeval installed.",
};
