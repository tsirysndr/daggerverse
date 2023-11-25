import Client, { Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, floxBase } from "./lib.ts";

export enum Job {
  dev = "dev",
  install = "install",
}

export const exclude = [];

export const dev = async (src: string | Directory | undefined = ".") => {
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
};

export const install = async (
  src: string | Directory | undefined = ".",
  environment: string,
  pkgs: string[]
) => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = floxBase(client, Job.install)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["flox", "create", "-e", environment])
      .withExec(["flox", "install", "-e", environment, ...pkgs]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export type JobExec =
  | ((src?: string) => Promise<string>)
  | ((src: string, environment: string, pkgs: string[]) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.dev]: dev,
  [Job.install]: install,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.dev]: "Return a container with flox installed",
  [Job.install]: "Install packages in a Docker Container and return it",
};
