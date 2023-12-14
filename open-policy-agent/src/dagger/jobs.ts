import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  eval = "eval",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Evaluate a rego query
 * @param {string | Directory | undefined} src
 * @param {string} data
 * @param {string} input
 * @param {string} query
 * @returns {string}
 */
export async function evaluate(
  src: string | Directory,
  data: string,
  input: string,
  query: string
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.eval)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "opa"])
      .withExec([
        "bash",
        "-c",
        `opa eval --data ${data} --input ${input} ${query}`,
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Returns a container with Open Policy Agent installed.
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "opa"]);

    await ctr.stdout();

    id = await ctr.id();
  });
  return id;
}

export type JobExec = (
  src: string | Directory,
  data: string,
  input: string,
  query: string
) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.eval]: evaluate,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.eval]: "Evaluate a rego query",
  [Job.dev]: "Returns a container with Open Policy Agent installed.",
};
