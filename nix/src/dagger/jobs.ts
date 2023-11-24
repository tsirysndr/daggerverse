import Client, { Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  setupNix = "setup-nix",
}

export const exclude = [];

export const setupNix = async (src?: string | Directory) => {
  let id = "";
  await connect(async (client: Client) => {
    let ctr = client
      .pipeline(Job.setupNix)
      .container()
      .from("ubuntu:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "curl"])
      .withExec([
        "sh",
        "-c",
        `curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux \
          --extra-conf "sandbox = false" \
          --init none \
          --no-confirm
        `,
      ])
      .withExec([
        "sed",
        "-i",
        "s/auto-allocate-uids = true/auto-allocate-uids = false/g",
        "/etc/nix/nix.conf",
      ])
      .withEnvVariable("PATH", "${PATH}:/nix/var/nix/profiles/default/bin", {
        expand: true,
      });

    if (src) {
      const context = getDirectory(client, src);
      ctr = ctr.withDirectory("/app", context).withWorkdir("/app");
    }

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.setupNix]: setupNix,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.setupNix]: "Setup Nix with DeterminateSystems Nix Installer",
};
