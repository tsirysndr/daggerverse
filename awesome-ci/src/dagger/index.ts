import { jobDescriptions } from "./jobs/desc.ts";
import { dev } from "./jobs/dev.ts";
import { fileCr } from "./jobs/file-cr.ts";
import { fileCrlf } from "./jobs/file-crlf.ts";
import { fileEmpty } from "./jobs/file-empty.ts";
import { fileNullByteChar } from "./jobs/file-nullbyte-char.ts";
import { fileTrailingNewline } from "./jobs/file-trailing-newline.ts";
import { fileTrailingSingleNewline } from "./jobs/file-trailing-single-newline.ts";
import { fileTrailingSpace } from "./jobs/file-trailing-space.ts";
import { fileUtf8Bom } from "./jobs/file-utf8-bom.ts";
import { fileUtf8 } from "./jobs/file-utf8.ts";
import { gitConflicts } from "./jobs/git-conflicts.ts";
import { gitIgnored } from "./jobs/git-ignored.ts";
import { syntaxBash } from "./jobs/syntax-bash.ts";
import { syntaxCss } from "./jobs/syntax-css.ts";
import { syntaxJs } from "./jobs/syntax-js.ts";
import { syntaxJson } from "./jobs/syntax-json.ts";
import { syntaxMarkdown } from "./jobs/syntax-markdown.ts";
import pipeline from "./pipeline.ts";

export {
  pipeline,
  dev,
  gitConflicts,
  gitIgnored,
  fileCr,
  fileCrlf,
  fileEmpty,
  fileNullByteChar,
  fileTrailingNewline,
  fileTrailingSingleNewline,
  fileTrailingSpace,
  fileUtf8,
  fileUtf8Bom,
  syntaxBash,
  syntaxCss,
  syntaxJs,
  syntaxJson,
  syntaxMarkdown,
  jobDescriptions,
};
