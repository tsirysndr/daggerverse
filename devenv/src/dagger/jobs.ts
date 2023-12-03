import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, devenvBase } from "./lib.ts";

export enum Job {
  run = "run",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Run a command
 * @param src {string | Directory | undefined}
 * @param command {string}
 * @returns {string}
 */
export async function run(
  src: string | Directory = ".",
  command: string
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

    const ctr = devenvBase(client, Job.run)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["bash", "-c", `devenv shell ${command}`]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
}

/**
 * @function
 * @description Return a container with a dev environment
 * @param src {string | Directory | undefined}
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = devenvBase(client, Job.dev)
      .withDirectory("/app", context)
      .withWorkdir("/app");

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
}

export type JobExec =
  | ((src?: string) => Promise<Container | string>)
  | ((src: string, command: string) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.run]: run,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.run]: "Run a command",
  [Job.dev]: "Return a container with a dev environment",
};
