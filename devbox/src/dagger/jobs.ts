/**
 * @module devbox
 * @description This module provides a set of functions to run commands inside devbox shell and to create a development environment with devbox installed.
 */

import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, devboxBase } from "./lib.ts";

export enum Job {
  run = "run",
  dev = "dev",
  install = "install",
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
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);

    const ctr = devboxBase(client, Job.run)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["bash", "-c", `devbox run -- ${command}`]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
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
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = devboxBase(client, Job.dev)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withDefaultTerminalCmd(["bash", "-i"]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
}

/**
 * @function
 * @description Install packages in a Docker Container and return it
 * @param {string | Directory | undefined} src
 * @param {string[]} pkgs
 * @returns {string}
 */
export async function install(
  src: string | Directory | undefined = ".",
  pkgs: string[]
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = await devboxBase(client, Job.install)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["devbox", "global", "add", ...pkgs])
      .withDefaultTerminalCmd(["bash", "-i"]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
}

export type JobExec =
  | ((src?: string) => Promise<Container | string>)
  | ((src: string, command: string) => Promise<Container | string>)
  | ((src: string, pkgs: string[]) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.run]: run,
  [Job.dev]: dev,
  [Job.install]: install,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.run]: "Run a command",
  [Job.dev]: "Return a container with a dev environment",
  [Job.install]: "Install packages in a Docker Container and return it",
};
