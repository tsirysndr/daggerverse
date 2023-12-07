import { Directory } from "../../../deps.ts";
import { Client } from "../../../sdk/client.gen.ts";
import { connect } from "../../../sdk/connect.ts";
import { getDirectory } from "../lib.ts";
import { Job } from "./mod.ts";

/**
 * @function
 * @description Scan PHP files for PHP syntax errors.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function syntaxPhp(
  src: string | Directory | undefined = ".",
  path = ".",
  ignore?: string,
  extensions?: string
): Promise<string> {
  let stdout = "";
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
      .pipeline(Job.syntaxPhp)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["syntax-php", `--path=${path}`, ...args]);

    stdout = await ctr.stdout();
  });
  return stdout;
}
