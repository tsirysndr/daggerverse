import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  dev = "dev",
  gitConflicts = "gitConflicts",
  gitIgnored = "gitIgnored",
  fileCr = "fileCr",
  fileCrlf = "fileCrlf",
  fileEmpty = "fileEmpty",
  fileNullByteChar = "fileNullByteChar",
  fileTrailingNewline = "fileTrailingNewline",
}

export const exclude = [];

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
    const context = getDirectory(client, src);
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

/**
 * @function
 * @description Scan files and check if they contain git conflicts.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function gitConflicts(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.gitConflicts)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["git-conflicts", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan git directory and see if ignored files are still in git cache.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function gitIgnored(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.gitIgnored)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["git-ignored", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain CR (Carriage Return only).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function fileCr(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-cr", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain CRLF (Windows Line Feeds).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function fileCrlf(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-cr", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they are empty (0 bytes).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function fileEmpty(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-empty", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain a null-byte character (\x00).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function fileNullByteChar(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-nullbyte-char", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain a trailing newline.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @returns {string}
 */
export async function fileTrailingNewline(
  src: string | Directory | undefined = ".",
  path = "."
): Promise<string> {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-trailing-newline", `--path=${path}`]);

    await ctr.stdout();
  });
  return "Done";
}

export type JobExec = (src?: string) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.dev]: dev,
  [Job.gitConflicts]: gitConflicts,
  [Job.gitIgnored]: gitIgnored,
  [Job.fileCr]: fileCr,
  [Job.fileCrlf]: fileCrlf,
  [Job.fileEmpty]: fileEmpty,
  [Job.fileNullByteChar]: fileNullByteChar,
  [Job.fileTrailingNewline]: fileTrailingNewline,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.dev]: "Returns a container with awesome-ci installed.",
  [Job.gitConflicts]: "Scan files and check if they contain git conflicts.",
  [Job.gitIgnored]:
    "Scan git directory and see if ignored files are still in git cache.",
  [Job.fileCr]:
    "Scan files and check if they contain CR (Carriage Return only).",
  [Job.fileCrlf]:
    "Scan files and check if they contain CRLF (Windows Line Feeds).",
  [Job.fileEmpty]: "Scan files and check if they are empty (0 bytes).",
  [Job.fileNullByteChar]:
    "Scan files and check if they contain a null-byte character (\x00).",
  [Job.fileTrailingNewline]:
    "Scan files and check if they contain a trailing newline.",
};
