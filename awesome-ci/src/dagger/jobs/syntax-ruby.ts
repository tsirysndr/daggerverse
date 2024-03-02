import { dag, Directory } from "../../../deps.ts";
import { getDirectory } from "../lib.ts";
import { Job } from "./mod.ts";

/**
 * @function
 * @description Scan Ruby files for Ruby syntax errors.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function syntaxRuby(
  src: string | Directory | undefined = ".",
  path = ".",
  ignore?: string,
  extensions?: string
): Promise<string> {
  const context = await getDirectory(src);
  const args = [];

  if (ignore) {
    args.push(`--ignore="${ignore}"`);
  }

  if (extensions) {
    args.push(`--extensions="${extensions}"`);
  }

  const ctr = dag
    .pipeline(Job.syntaxRuby)
    .container()
    .from("cytopia/awesome-ci")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["syntax-ruby", `--path=${path}`, ...args]);

  return ctr.stdout();
}
