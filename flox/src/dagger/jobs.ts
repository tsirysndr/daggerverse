import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, floxBase } from "./lib.ts";

export enum Job {
  dev = "dev",
  install = "install",
}

export const exclude = [];

/**
 * @function
 * @description Return a container with flox installed
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = floxBase(client, Job.dev)
      .withDirectory("/app", context)
      .withWorkdir("/app");

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
}

/**
 * @function
 * @description Install packages in a Docker Container and return it
 * @param src {string | Directory | undefined}
 * @param pkgs {string[]}
 * @returns {string}
 */
export async function install(
  src: string | Directory | undefined = ".",
  pkgs: string[]
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = floxBase(client, Job.install)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["flox", "install", ...pkgs]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
}

export type JobExec =
  | ((src?: string) => Promise<Container | string>)
  | ((src: string, pkgs: string[]) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.dev]: dev,
  [Job.install]: install,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.dev]: "Return a container with flox installed",
  [Job.install]: "Install packages in a Docker Container and return it",
};
