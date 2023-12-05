import Client, { Directory, Container, File } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  generate = "generate",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Generate Terraform modules documentation
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} format
 * @returns {File | string}
 */
export async function generate(
  src: Directory | string,
  path = ".",
  format = "md",
  output = "README.md"
): Promise<File | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.generate)
      .container()
      .from(`cytopia/terraform-docs`)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([
        "sh",
        `terraform-docs-012 --sort-by-required ${format} ${path} > ${output}`,
      ]);

    await ctr.stdout();
    id = await ctr.file(`/app/${output}`).id();
  });
  return id;
}

/**
 * @function
 * @description Return a Container with terraform-docs installed
 * @param {string | Directory | undefined} src
 * @returns {Container | string}
 */
export async function dev(
  src: Directory | string
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.generate)
      .container()
      .from(`cytopia/terraform-docs`)
      .withDirectory("/app", context)
      .withWorkdir("/app");

    await ctr.stdout();
    id = await ctr.id();
  });
  return id;
}

export type JobExec = (
  src: string,
  path?: string,
  format?: string
) => Promise<Container | File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.generate]: generate,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.generate]: "Generate Terraform modules documentation",
  [Job.dev]: "Return a Container with terraform-docs installed",
};
