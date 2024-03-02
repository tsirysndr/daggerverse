/**
 * @module devenv
 * @description This module provides a set of functions to run a command inside devenv shell, return a container with devenv installed, and build the devenv shell and run any pre-commit hooks.
 */

import { Directory, Container } from "../../deps.ts";
import { getDirectory, devenvBase } from "./lib.ts";

export enum Job {
  run = "run",
  dev = "dev",
  ci = "ci",
}

export const exclude = [];

/**
 * @function
 * @description Run a command
 * @param src {string | Directory | undefined}
 * @param command {string}
 * @returns {string}
 */
export async function run(
  src: string | Directory = ".",
  command: string
): Promise<Container | string> {
  const context = await getDirectory(src);

  const ctr = devenvBase(Job.run)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["bash", "-c", `devenv shell ${command}`]);

  await ctr.stdout();
  return ctr.id();
}

/**
 * @function
 * @description Return a container with a dev environment
 * @param src {string | Directory | undefined}
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = devenvBase(Job.dev)
    .withDirectory("/app", context)
    .withWorkdir("/app");

  await ctr.stdout();
  return ctr.id();
}

/**
 * @function
 * @description Build the devenv shell and run any pre-commit hooks
 * @param src {string | Directory | undefined}
 * @returns {string}
 */
export async function ci(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = devenvBase(Job.ci)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["bash", "-c", "devenv ci"]);

  await ctr.stdout();
  return ctr.id();
}

export type JobExec =
  | ((src?: string) => Promise<Container | string>)
  | ((src: string, command: string) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.run]: run,
  [Job.dev]: dev,
  [Job.ci]: ci,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.run]: "Run a command",
  [Job.dev]: "Return a container with a dev environment",
  [Job.ci]: "Build the devenv shell and run any pre-commit hooks",
};
