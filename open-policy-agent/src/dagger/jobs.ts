/**
 * @module open-policy-agent
 * @description This module provides a function to evaluate a rego query and to create a development environment with Open Policy Agent installed.
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  eval = "eval",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Evaluate a rego query
 * @param {string | Directory | undefined} src
 * @param {string} data
 * @param {string} input
 * @param {string} query
 * @returns {string}
 */
export async function evaluate(
  src: string | Directory,
  data: string,
  input: string,
  query: string
): Promise<string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.eval)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["pkgx", "install", "opa"])
    .withExec([
      "bash",
      "-c",
      `opa eval --data ${data} --input ${input} ${query}`,
    ]);

  return ctr.stdout();
}

/**
 * @function
 * @description Returns a container with Open Policy Agent installed.
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.dev)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["pkgx", "install", "opa"]);

  await ctr.stdout();

  return ctr.id();
}

export type JobExec = (
  src: string | Directory,
  data: string,
  input: string,
  query: string
) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.eval]: evaluate,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.eval]: "Evaluate a rego query",
  [Job.dev]: "Returns a container with Open Policy Agent installed.",
};
