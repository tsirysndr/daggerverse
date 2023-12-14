import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Tests your configuration files using Conftest.
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function test(
  src: string | Directory,
  files: string,
  policy = "policy",
  output = "stdout"
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.test)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "conftest"])
      .withExec([
        "bash",
        "-c",
        `conftest test ${files} -p ${policy} -o ${output}`,
      ]);

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Returns a container with conftest installed.
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
      .withExec(["pkgx", "install", "conftest"]);

    await ctr.stdout();

    id = await ctr.id();
  });
  return id;
}

export type JobExec = (
  src: string | Directory,
  files: string,
  policy?: string,
  output?: string
) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Tests your configuration files using Conftest.",
  [Job.dev]: "Returns a container with Conftest installed.",
};
