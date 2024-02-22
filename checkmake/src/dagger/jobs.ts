/**
 * @module checkmake
 * @description This module provides a set of functions to lint Makefiles and to create a development environment with checkmake installed.
 */

import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
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
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.lint)
      .container()
      .from("cytopia/checkmake")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([files]);

    await ctr.stdout();
    id = await ctr.directory("/app").id();
  });
  return id;
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
