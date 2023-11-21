import Client from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";

export enum Job {
  install = "install",
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

export type JobExec = (pkgs: string[]) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.install]: install,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.install]: "Install packages in a Docker Container and return it",
};
