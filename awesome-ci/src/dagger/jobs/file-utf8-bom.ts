import Client, { Directory } from "../../../deps.ts";
import { connect } from "../../../sdk/connect.ts";
import { getDirectory } from "../lib.ts";
import { Job } from "./mod.ts";

/**
 * @function
 * @description Scan files and check if they contain BOM (Byte Order Mark): <U+FEFF>.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileUtf8Bom(
  src: string | Directory | undefined = ".",
  path = ".",
  ignore?: string,
  extensions?: string
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const args = [];

    if (extensions) {
      args.push(`--extensions="${extensions}"`);
    }

    if (ignore) {
      args.push(`--ignore="${ignore}"`);
    }

    const ctr = client
      .pipeline(Job.fileUtf8Bom)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-utf8-bom", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}
