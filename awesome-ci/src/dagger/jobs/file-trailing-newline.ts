import Client, { Directory } from "../../../deps.ts";
import { connect } from "../../../sdk/connect.ts";
import { getDirectory } from "../lib.ts";
import { Job } from "./mod.ts";

/**
 * @function
 * @description Scan files and check if they contain a trailing newline.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileTrailingNewline(
  src: string | Directory | undefined = ".",
  path = ".",
  ignore?: string,
  extensions?: string
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const args = [];

    if (ignore) {
      args.push(`--ignore="${ignore}"`);
    }

    if (extensions) {
      args.push(`--extensions="${extensions}"`);
    }

    const ctr = client
      .pipeline(Job.fileTrailingNewline)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-trailing-newline", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}
