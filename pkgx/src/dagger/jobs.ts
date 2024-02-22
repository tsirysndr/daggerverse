/**
 * @module pkgx
 * @description This module provides a set of functions to install packages and to create a development environment with pkgx installed.
 */
import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  install = "install",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Install packages in a Docker Container and return it
 * @param {string[]} pkgs
 * @returns {string}
 */
export async function install(pkgs: string[]): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const ctr = client
      .pipeline(Job.install)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withExec(["pkgx", "install", ...pkgs]);

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}

/**
 * @function
 * @description Activate developer environment in a Docker Container and return it
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["bash", "-c", "source ~/.bashrc && dev"]);

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}

export type JobExec =
  | ((pkgs: string[]) => Promise<Container | string>)
  | ((src?: string) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.install]: install,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.install]: "Install packages in a Docker Container and return it",
  [Job.dev]:
    "Activate developer environment in a Docker Container and return it",
};
