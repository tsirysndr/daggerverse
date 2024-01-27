import { Directory, Service } from "../../deps.ts";
import { dag } from "../../sdk/client.gen.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  wiremock = "wiremock",
}

export const exclude = [];

/**
 * @function
 * @description Start wiremock server
 * @param {string | Directory | undefined} mappings
 * @param {string | Directory | undefined} files
 * @returns {Service | string}
 */
export async function wiremock(
  mappings?: Directory | string,
  files?: Directory | string
): Promise<Service | string> {
  let ctr = dag
    .pipeline(Job.wiremock)
    .container()
    .from("wiremock/wiremock:3.3.1");

  if (mappings) {
    const _mappings = await getDirectory(dag, mappings);
    ctr = ctr.withDirectory("/home/wiremock/mappings", _mappings);
  }

  if (files) {
    const _files = await getDirectory(dag, files);
    ctr = ctr.withDirectory("/home/wiremock/__files", _files);
  }

  return ctr.withExposedPort(8080).asService().id();
}

export type JobExec = (
  mapping?: Directory | string,
  files?: Directory | string
) => Promise<Service | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.wiremock]: wiremock,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.wiremock]: "Start wiremock server",
};
