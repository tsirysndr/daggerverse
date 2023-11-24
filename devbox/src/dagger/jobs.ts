import Client, { Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, devboxBase } from "./lib.ts";

export enum Job {
  run = "run",
  dev = "dev",
  install = "install",
}

export const exclude = [];

export const run = async (src: string | Directory = ".", command: string) => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

    const ctr = devboxBase(client, Job.run)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["bash", "-c", `devbox run -- ${command}`]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export const dev = async (src: string | Directory | undefined = ".") => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = devboxBase(client, Job.dev)
      .withDirectory("/app", context)
      .withWorkdir("/app");

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export const install = async (
  src: string | Directory | undefined = ".",
  pkgs: string[]
) => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = devboxBase(client, Job.install)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["devbox", "global", "add", ...pkgs]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export type JobExec =
  | ((src?: string) => Promise<string>)
  | ((src: string, command: string) => Promise<string>)
  | ((src: string, pkgs: string[]) => Promise<string>);

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
