import Client, { Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  install = "install",
  dev = "dev",
}

export const exclude = [];

export const install = async (pkgs: string[]) => {
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
};

export const dev = async (src: string | Directory | undefined = ".") => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["bash", "-c", "echo dev >> ~/.bashrc"]);

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
};

export type JobExec =
  | ((pkgs: string[]) => Promise<string>)
  | ((src?: string) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.install]: install,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.install]: "Install packages in a Docker Container and return it",
  [Job.dev]:
    "Activate developer environment in a Docker Container and return it",
};
