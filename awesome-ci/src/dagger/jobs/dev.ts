/**
 * @module awesome-ci
 * @description Awesome Continuous Integration - Lot's of tools for git, file and static source code analysis.
 */

import { dag, Directory, Container } from "../../../deps.ts";
import { getDirectory } from "../lib.ts";
import { Job } from "./mod.ts";

/**
 * @function
 * @description Returns a container with awesome-ci installed.
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.dev)
    .container()
    .from("cytopia/awesome-ci")
    .withDirectory("/app", context)
    .withWorkdir("/app");

  const result = await ctr.stdout();
  console.log(result);
  return ctr.id();
}
