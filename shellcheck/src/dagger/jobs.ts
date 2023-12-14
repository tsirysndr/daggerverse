import Client, { Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lint = "lint",
}

export const exclude = [];

/**
 * @function
 * @description Lint a shell script with ShellCheck.
 * @param {Directory | string} src
 * @param {string} format
 * @param {string} path
 * @param {string} shell
 * @param {string} severity
 * @param {string} check
 * @returns {Promise<string>}
 */
export async function lint(
  src: Directory | string,
  files = "*.sh",
  format?: string,
  shell?: string,
  severity?: string,
  check?: string
): Promise<string> {
  let result = "";
  const args: string[] = [];

  if (format) args.push("-f", format);
  if (shell) args.push("-s", shell);
  if (severity) args.push("-S", severity);
  if (check) args.push("-o", check);

  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.lint)
      .container()
      .from("koalaman/shellcheck:latest")
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([...args, files]);

    result = await ctr.stdout();
  });
  return result;
}

export type JobExec = (repo: string) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lint]: lint,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lint]: "Lint a shell script with ShellCheck.",
};
