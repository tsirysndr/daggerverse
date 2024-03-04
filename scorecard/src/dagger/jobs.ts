/**
 * @module scorecard
 * @description This module provides a function to calculate the scorecard for a given repository.
 */

import { dag, Secret } from "../../deps.ts";
import { getGithubAuthToken } from "./lib.ts";

export enum Job {
  calc = "calc",
}

export const exclude = [];

/**
 * Calculates the scorecard for a given repository
 *
 * @function
 * @description Calculates the scorecard for a given repository.
 * @param {string} repo
 * @param {string} format
 * @param {string} checks
 * @param {Secret | string} token
 * @returns {Promise<string>}
 */
export async function calc(
  repo: string,
  format?: string,
  checks?: string,
  token?: Secret | string
): Promise<string> {
  const args: string[] = [];

  if (format) {
    args.push("--format", format);
  }

  if (checks) {
    args.push("--checks", checks);
  }

  const secret = await getGithubAuthToken(token);

  let baseCtr = dag
    .pipeline(Job.calc)
    .container()
    .from(
      "gcr.io/openssf/scorecard@sha256:c16e433f68799fe69dc0f9675c7ba5d2553846b57262550c86c71165269a7961"
    );

  if (secret) {
    baseCtr = baseCtr.withSecretVariable("GITHUB_AUTH_TOKEN", secret);
  }

  const ctr = baseCtr.withExec(["--repo", repo, ...args]);

  return ctr.stdout();
}

export type JobExec = (repo: string) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.calc]: calc,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.calc]: "Calculates the scorecard for a given repository.",
};
