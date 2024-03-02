/**
 * @module rtx
 * @description This module provides a function to create a development environment with rtx installed and activated in the current directory.
 */

import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Returns a container with rtx installed and activated in the current directory.
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
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "libssl1.1"])
    .withExec(["pkgx", "install", "rtx", "git", "curl", "wget"])
    .withExec(["sh", "-c", `echo 'eval "$(rtx activate bash)"' >> ~/.bashrc`])
    .withExec(["bash", "-c", "source ~/.bashrc"])
    .withExec(["rtx", "install"]);

  await ctr.stdout();
  return ctr.id();
}

export type JobExec =
  | ((pkgs: string[]) => Promise<Container | string>)
  | ((src?: string) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.dev]:
    "Returns a container with rtx installed and activated in the current directory.",
};
