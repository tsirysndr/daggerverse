import { Container } from "../../../deps.ts";

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
  syntaxJson = "syntaxJson",
  syntaxMarkdown = "syntaxMarkdown",
}

export const exclude = [];
export type JobExec = (src?: string) => Promise<Container | string>;
