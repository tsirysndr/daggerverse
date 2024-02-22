/**
 * @module awesome-ci
 * @description Awesome Continuous Integration - Lot's of tools for git, file and static source code analysis.
 */

import { Directory, Container } from "../../../deps.ts";
import { Client } from "../../../sdk/client.gen.ts";
import { connect } from "../../../sdk/connect.ts";
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
  let id = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app");

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}
