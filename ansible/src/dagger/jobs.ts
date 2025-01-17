/**
 * @module ansible
 * @description This module provides a set of functions to run ansible playbooks and to create a development environment with ansible installed.
 */
import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  playbook = "playbook",
  dev = "dev",
}

export const exclude = [];

/**
 * Run a playbook
 *
 * @function
 * @description Run a playbook.
 * @param {string | Directory | undefined} src
 * @param {string} playbook
 * @param {string} tag
 * @returns {string}
 */
export async function playbook(
  src: Directory | string,
  playbook: string,
  tag = "latest"
): Promise<string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.playbook)
    .container()
    .from(`cytopia/ansible:${tag}`)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["ansible-playbook", playbook]);

  return ctr.stdout();
}

/**
 * @function
 * @description Returns a container with ansible installed.
 * @param {string | Directory | undefined} src
 * @param {string} tag
 * @returns {Container | string}
 */
export async function dev(
  src: string | Directory | undefined = ".",
  tag = "latest"
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.dev)
    .container()
    .from(`cytopia/ansible:${tag}`)
    .withDirectory("/app", context)
    .withWorkdir("/app");

  await ctr.stdout();
  return ctr.id();
}

export type JobExec =
  | ((
      src: string,
      playbook: string,
      tag?: string
    ) => Promise<Container | Directory | string>)
  | ((src?: string, tag?: string) => Promise<Container | Directory | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.playbook]: playbook,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.playbook]: "Runs a playbook.",
  [Job.dev]: "Returns a container with ansible installed.",
};
