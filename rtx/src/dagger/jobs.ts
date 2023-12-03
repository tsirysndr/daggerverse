import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Returns a container with rtx installed and activated in the current directory.
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
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "rtx", "git", "curl", "wget"])
      .withExec(["sh", "-c", `echo 'eval "$(rtx activate bash)"' >> ~/.bashrc`])
      .withExec(["bash", "-c", "source ~/.bashrc"])
      .withExec(["rtx", "install"]);

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}

export type JobExec =
  | ((pkgs: string[]) => Promise<Container | string>)
  | ((src?: string) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.dev]:
    "Returns a container with rtx installed and activated in the current directory.",
};
