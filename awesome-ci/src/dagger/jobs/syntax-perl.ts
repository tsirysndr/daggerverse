import { dag, Directory } from "../../../deps.ts";
import { getDirectory } from "../lib.ts";
import { Job } from "./mod.ts";

/**
 * Scan Perl files for Perl syntax errors
 *
 * @function
 * @description Scan Perl files for Perl syntax errors.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function syntaxPerl(
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
    .pipeline(Job.syntaxPerl)
    .container()
    .from("cytopia/awesome-ci")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["syntax-perl", `--path=${path}`, ...args]);

  return ctr.stdout();
}
