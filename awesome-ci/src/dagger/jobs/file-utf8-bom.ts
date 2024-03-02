import { dag, Directory } from "../../../deps.ts";
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
  const context = await getDirectory(src);
  const args = [];

  if (extensions) {
    args.push(`--extensions="${extensions}"`);
  }

  if (ignore) {
    args.push(`--ignore="${ignore}"`);
  }

  const ctr = dag
    .pipeline(Job.fileUtf8Bom)
    .container()
    .from("cytopia/awesome-ci")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["file-utf8-bom", `--path=${path}`, ...args]);

  return ctr.stdout();
}
