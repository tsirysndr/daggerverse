import { fileTrailingSpace } from "../index.ts";
import { dev } from "./dev.ts";
import { fileCr } from "./file-cr.ts";
import { fileCrlf } from "./file-crlf.ts";
import { fileEmpty } from "./file-empty.ts";
import { fileNullByteChar } from "./file-nullbyte-char.ts";
import { fileTrailingNewline } from "./file-trailing-newline.ts";
import { fileTrailingSingleNewline } from "./file-trailing-single-newline.ts";
import { fileUtf8Bom } from "./file-utf8-bom.ts";
import { fileUtf8 } from "./file-utf8.ts";
import { gitConflicts } from "./git-conflicts.ts";
import { gitIgnored } from "./git-ignored.ts";
import { Job, JobExec } from "./mod.ts";
import { syntaxBash } from "./syntax-bash.ts";
import { syntaxCss } from "./syntax-css.ts";
import { syntaxJs } from "./syntax-js.ts";
import { syntaxJson } from "./syntax-json.ts";
import { syntaxMarkdown } from "./syntax-markdown.ts";
import { syntaxPerl } from "./syntax-perl.ts";
import { syntaxPhp } from "./syntax-php.ts";
import { syntaxPython } from "./syntax-python.ts";
import { syntaxRuby } from "./syntax-ruby.ts";
import { syntaxScss } from "./syntax-scss.ts";
import { syntaxSh } from "./syntax-sh.ts";
import { inlineCss } from "./inline-css.ts";
import { inlineJs } from "./inline-js.ts";

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
  [Job.syntaxJson]: syntaxJson,
  [Job.syntaxMarkdown]: syntaxMarkdown,
  [Job.syntaxPerl]: syntaxPerl,
  [Job.syntaxPhp]: syntaxPhp,
  [Job.syntaxPython]: syntaxPython,
  [Job.syntaxRuby]: syntaxRuby,
  [Job.syntaxScss]: syntaxScss,
  [Job.syntaxSh]: syntaxSh,
  [Job.inlineCss]: inlineCss,
  [Job.inlineJs]: inlineJs,
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
  [Job.syntaxJson]: "Scan files for JSON syntax errors.",
  [Job.syntaxMarkdown]: "Scan files for Markdown syntax errors.",
  [Job.syntaxPerl]: "Scan Perl files for Perl syntax errors.",
  [Job.syntaxPhp]: "Scan PHP files for PHP syntax errors.",
  [Job.syntaxPython]: "Scan Python files for Python syntax errors.",
  [Job.syntaxRuby]: "Scan Ruby files for Ruby syntax errors.",
  [Job.syntaxScss]: "Scan SCSS files for SCSS syntax errors.",
  [Job.syntaxSh]: "Scan shell files for /bin/sh syntax errors.",
  [Job.inlineCss]: "Scan files and check if they contain inline css code.",
  [Job.inlineJs]:
    "Scan files and check if they contain inline javascript code.",
};
