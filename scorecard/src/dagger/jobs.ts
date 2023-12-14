import Client, { Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";

export enum Job {
  calc = "calc",
}

export const exclude = [];

/**
 * @function
 * @description Calculates the scorecard for a given repository.
 * @param {string} repo
 * @param {string} format
 * @param {string} checks
 * @returns {Promise<string>}
 */
export async function calc(
  repo: string,
  format?: string,
  checks?: string
): Promise<string> {
  let result = "";
  const args: string[] = [];

  if (format) {
    args.push("--format", format);
  }

  if (checks) {
    args.push("--checks", checks);
  }

  await connect(async (client: Client) => {
    const ctr = client
      .pipeline(Job.calc)
      .container()
      .from(
        "gcr.io/openssf/scorecard@sha256:c16e433f68799fe69dc0f9675c7ba5d2553846b57262550c86c71165269a7961"
      )
      .withExec(["--repo", repo, ...args]);

    result = await ctr.stdout();
  });
  return result;
}

export type JobExec = (repo: string) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.calc]: calc,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.calc]: "Calculates the scorecard for a given repository.",
};
