/**
 * @module Conftest
 * @description This module provides a set of functions to test your configuration files using Conftest and to create a development environment with Conftest installed.
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  dev = "dev",
}

export const exclude = [];

/**
 * Tests your configuration files using Conftest
 *
 * @function
 * @description Tests your configuration files using Conftest.
 * @param {string | Directory | undefined} src
 * @param {string} files
 * @param {string} policy
 * @param {string} outputFormat
 * @returns {string}
 */
export async function test(
  src: string | Directory,
  files: string,
  policy = "policy",
  outputFormat = "stdout"
): Promise<string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.test)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["pkgx", "install", "conftest"])
    .withExec([
      "bash",
      "-c",
      `conftest test ${files} -p ${policy} -o ${outputFormat}`,
    ]);

  return ctr.stdout();
}

/**
 * Returns a container with conftest installed
 *
 * @function
 * @description Returns a container with conftest installed.
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
    .withExec(["pkgx", "install", "conftest"]);

  await ctr.stdout();

  return ctr.id();
}

export type JobExec = (
  src: string | Directory,
  files: string,
  policy?: string,
  outputFormat?: string
) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Tests your configuration files using Conftest.",
  [Job.dev]: "Returns a container with Conftest installed.",
};
