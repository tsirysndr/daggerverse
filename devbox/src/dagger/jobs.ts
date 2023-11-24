import Client, { setupNix, ContainerID, Directory } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  run = "run",
  dev = "dev",
  install = "install",
}

export const exclude = [];

export const run = async (src: string | Directory = ".", command: string) => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

    const ctr = client
      .container({
        // deno-lint-ignore no-explicit-any
        id: (await setupNix(src as any)) as ContainerID,
      })
      .pipeline(Job.run)
      .withExec(["adduser", "--disabled-password", "devbox"])
      .withExec(["addgroup", "devbox", "nixbld"])
      .withEnvVariable("FORCE", "1")
      .withExec(["sh", "-c", "curl -fsSL https://get.jetpack.io/devbox | bash"])
      .withExec([
        "sh",
        "-c",
        `echo 'eval "$(devbox global shellenv)"' >> ~/.bashrc`,
      ])
      .withExec(["devbox", "version"])
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["bash", "-c", `devbox run -- ${command}`])
      .withEntrypoint(["bash", "-i"]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export const dev = async (src: string | Directory | undefined = ".") => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .container({
        // deno-lint-ignore no-explicit-any
        id: (await setupNix(src as any)) as ContainerID,
      })
      .pipeline(Job.dev)
      .withExec(["adduser", "--disabled-password", "devbox"])
      .withExec(["addgroup", "devbox", "nixbld"])
      .withEnvVariable("FORCE", "1")
      .withExec(["sh", "-c", "curl -fsSL https://get.jetpack.io/devbox | bash"])
      .withExec([
        "sh",
        "-c",
        `echo 'eval "$(devbox global shellenv)"' >> ~/.bashrc`,
      ])
      .withExec(["devbox", "version"])
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withEntrypoint(["bash", "-i"]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export const install = async (
  src: string | Directory | undefined = ".",
  pkgs: string[]
) => {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .container({
        // deno-lint-ignore no-explicit-any
        id: (await setupNix(src as any)) as ContainerID,
      })
      .pipeline(Job.install)
      .withExec(["adduser", "--disabled-password", "devbox"])
      .withExec(["addgroup", "devbox", "nixbld"])
      .withEnvVariable("FORCE", "1")
      .withExec(["sh", "-c", "curl -fsSL https://get.jetpack.io/devbox | bash"])
      .withExec([
        "sh",
        "-c",
        `echo 'eval "$(devbox global shellenv)"' >> ~/.bashrc`,
      ])
      .withExec(["devbox", "version"])
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["devbox", "global", "add", ...pkgs])
      .withEntrypoint(["bash", "-i"]);

    await ctr.stdout();
    id = await ctr.id();
  });

  return id;
};

export type JobExec =
  | ((src?: string) => Promise<string>)
  | ((src: string, command: string) => Promise<string>)
  | ((src: string, pkgs: string[]) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.run]: run,
  [Job.dev]: dev,
  [Job.install]: install,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.run]: "Run a command",
  [Job.dev]: "Return a container with a dev environment",
  [Job.install]: "Install packages in a Docker Container and return it",
};
