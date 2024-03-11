/**
 * @module envhub
 * @description This module provides a function to load dotfiles and packages from a envhub environment.
 */
import { dag, Directory, Container } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  use = "use",
  dev = "dev",
}

export const exclude = [];

/**
 * Load dotfiles and packages from a envhub environment
 *
 * @function
 * @description Load dotfiles and packages from a envhub environment.
 * @param {string | Directory | undefined} src
 * @param {string} environment
 * @returns {Container | string}
 */
export async function use(
  src: Directory | string,
  environment: string
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.use)
    .container()
    .from("ubuntu:23.10")
    .withDirectory("/app", context)
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "curl", "git"])
    .withExec(["sh", "-c", "curl -sSL https://install.envhub.sh | bash"])
    .withEnvVariable("PATH", "${PATH}:/nix/var/nix/profiles/default/bin", {
      expand: true,
    })
    .withExec(["envhub", "use", environment])
    .withExec(["nix", "--version"])
    .withExec(["ls", "-la", "/root"])
    .withExec(["envhub", "status"])
    .withDefaultTerminalCmd(["bash", "-i"]);

  await ctr.stdout();

  return ctr.id();
}

/**
 * Returns a container with envhub installed and environment loaded
 *
 * @function
 * @description Returns a container with envhub installed and environment loaded.
 * @param {string | Directory | undefined} src
 * @param {string} environment
 * @returns {Container | string}
 */
export async function dev(
  src: Directory | string | undefined = ".",
  environment?: string
): Promise<Container | string> {
  const context = await getDirectory(src);
  let ctr = dag
    .pipeline(Job.dev)
    .container()
    .from("ubuntu:23.10")
    .withDirectory("/app", context)
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "curl", "git"])
    .withExec(["sh", "-c", "curl -sSL https://install.envhub.sh | bash"])
    .withEnvVariable("PATH", "${PATH}:/nix/var/nix/profiles/default/bin", {
      expand: true,
    });

  if (environment) {
    ctr = ctr
      .withExec(["envhub", "use", environment])
      .withExec(["ls", "-la", "/root"])
      .withExec(["envhub", "status"]);
  }

  ctr = ctr
    .withExec(["nix", "--version"])
    .withDefaultTerminalCmd(["bash", "-i"]);

  await ctr.stdout();

  return ctr.id();
}

export type JobExec = (
  src: string,
  environment: string
) => Promise<Container | Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.use]: use,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.use]: "Load dotfiles and packages from a envhub environment",
  [Job.dev]: "Returns a container with envhub installed and environment loaded",
};
