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
  fileTrailingSingleNewline = "fileTrailingSingleNewline",
  fileTrailingSpace = "fileTrailingSpace",
  fileUtf8 = "fileUtf8",
  fileUtf8Bom = "fileUtf8Bom",
  syntaxBash = "syntaxBash",
  syntaxCss = "syntaxCss",
  syntaxJs = "syntaxJs",
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
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function gitConflicts(
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
      .pipeline(Job.gitConflicts)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["git-conflicts", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan git directory and see if ignored files are still in git cache.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function gitIgnored(
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
      .pipeline(Job.gitIgnored)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["git-ignored", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain CR (Carriage Return only).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileCr(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-cr", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain CRLF (Windows Line Feeds).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileCrlf(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-cr", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they are empty (0 bytes).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileEmpty(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-empty", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain a null-byte character (\x00).
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileNullByteChar(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-nullbyte-char", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-trailing-newline", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain exactly one trailing newline.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileTrailingSingleNewline(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-trailing-single-newline", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they contain trailing whitespaces.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileTrailingSpace(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-trailing-space", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan files and check if they have a non UTF-8 encoding.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function fileUtf8(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-utf8", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["file-utf8-bom", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan shell files for bash syntax errors.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function syntaxBash(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["syntax-bash", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan CSS files for CSS syntax errors.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function syntaxCss(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["syntax-css", `--path=${path}`, ...args]);

    await ctr.stdout();
  });
  return "Done";
}

/**
 * @function
 * @description Scan JS files for JS syntax errors.
 * @param {string | Directory | undefined} src
 * @param {string} path
 * @param {string} ignore
 * @param {string} extensions
 * @returns {string}
 */
export async function syntaxJs(
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
      .pipeline(Job.fileCr)
      .container()
      .from("cytopia/awesome-ci")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["syntax-js", `--path=${path}`, ...args]);

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
  [Job.fileTrailingSingleNewline]: fileTrailingSingleNewline,
  [Job.fileTrailingSpace]: fileTrailingSpace,
  [Job.fileUtf8]: fileUtf8,
  [Job.fileUtf8Bom]: fileUtf8Bom,
  [Job.syntaxBash]: syntaxBash,
  [Job.syntaxCss]: syntaxCss,
  [Job.syntaxJs]: syntaxJs,
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
  [Job.fileTrailingSingleNewline]:
    "Scan files and check if they contain exactly one trailing newline.",
  [Job.fileTrailingSpace]:
    "Scan files and check if they contain trailing whitespaces.",
  [Job.fileUtf8]: "Scan files and check if they have a non UTF-8 encoding.",
  [Job.fileUtf8Bom]:
    "Scan files and check if they contain BOM (Byte Order Mark): <U+FEFF>.",
  [Job.syntaxBash]: "Scan shell files for bash syntax errors.",
  [Job.syntaxCss]: "Scan CSS files for CSS syntax errors.",
  [Job.syntaxJs]: "Scan JS files for JS syntax errors.",
};
