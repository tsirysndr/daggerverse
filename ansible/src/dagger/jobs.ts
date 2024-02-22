/**
 * @module ansible
 * @description This module provides a set of functions to run ansible playbooks and to create a development environment with ansible installed.
 */

import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  playbook = "playbook",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Runs a playbook.
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
  let stdout = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.playbook)
      .container()
      .from(`cytopia/ansible:${tag}`)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["ansible-playbook", playbook]);

    stdout = await ctr.stdout();
  });
  return stdout;
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
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from(`cytopia/ansible:${tag}`)
      .withDirectory("/app", context)
      .withWorkdir("/app");

    await ctr.stdout();
    id = await ctr.id();
  });
  return id;
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
