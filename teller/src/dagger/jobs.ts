/**
 * @module shellcheck
 * @description This module provides a function to lint a shell script with ShellCheck.
 */

import { dag, Directory } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  run = "run",
}

export const exclude = [];

/**
 * Load secrets and Run a command
 *
 * @function
 * @description Load secrets and Run a command
 * @param {Directory | string} src
 * @param {string} format
 * @param {string} path
 * @param {string} shell
 * @param {string} severity
 * @param {string} check
 * @returns {Promise<string>}
 */
export async function run(
  src: Directory | string,
  command: string
): Promise<string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.run)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["pkgx", "install", "teller"])
    .withExec(["teller", "run", command]);

  return ctr.stdout();
}

export type JobExec = (
  src: Directory | string,
  command: string
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.run]: run,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.run]: "Load secrets and Run a command",
};
