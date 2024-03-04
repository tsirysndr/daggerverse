/**
 * @module terraform-docs
 * @description This module provides a function to generate Terraform modules documentation.
 */

import { dag, Directory, Container, File } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  generate = "generate",
}

export const exclude = [];

/**
 * Generate Terraform modules documentation
 *
 * @function
 * @description Generate Terraform modules documentation
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} format
 * @returns {File | string}
 */
export async function generate(
  src: Directory | string,
  path = ".",
  format = "md",
  output = "README.md"
): Promise<File | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.generate)
    .container()
    .from(`cytopia/terraform-docs`)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withEntrypoint(["/bin/sh", "-c"])
    .withExec([`terraform-docs ${format} ${path} > ${output}`]);

  await ctr.stdout();
  return ctr.file(`/app/${output}`).id();
}

export type JobExec = (
  src: string,
  path?: string,
  format?: string
) => Promise<Container | File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.generate]: generate,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.generate]: "Generate Terraform modules documentation",
};
