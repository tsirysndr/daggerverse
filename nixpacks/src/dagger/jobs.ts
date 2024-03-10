/**
 * @module nixpacks
 * @description This module provides a set of functions to build an OCI image from your project using nixpacks.
 */
import { dag, Directory, Container, File } from "../../deps.ts";
import { docker } from "./lib.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  build = "build",
  plan = "plan",
  dev = "dev",
}

export const exclude = [];

/**
 * Build an OCI image from your project using nixpacks
 *
 * @function
 * @description Build an OCI image from your project using nixpacks
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function build(
  src: string | Directory,
  name: string,
  path: string | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);
  const buildx = dag.container().from("docker/buildx-bin").file("/buildx");
  const ctr = dag
    .pipeline(Job.build)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "nixpacks", "docker"])
    .withExec(["nixpacks", "--version"])
    .withExec(["docker", "-v"])
    .withExec(["mkdir", "-p", "/root/.docker/cli-plugins"])
    .withFile("/root/.docker/cli-plugins/docker-buildx", buildx)
    .withExec(["docker", "buildx", "version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withServiceBinding("dockerd", docker("25.0.3", true))
    .withEnvVariable("DOCKER_HOST", "tcp://dockerd:2375")
    .withExec(["nixpacks", "build", path, "--name", name])
    .withExec(["docker", "images"]);
  return ctr.stdout();
}

/**
 * Generate a plan for building an OCI image from your project using nixpacks
 *
 * @function
 * @description Generate a plan for building an OCI image from your project using nixpacks
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function plan(
  src: string | Directory,
  path: string | undefined = ".",
  format: string | undefined = "json"
): Promise<File | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.build)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "nixpacks"])
    .withExec(["nixpacks", "--version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec([
      "bash",
      "-c",
      `nixpacks plan ${path} --format ${format} > /plan`,
    ])
    .withExec(["cat", "/plan"]);

  return ctr.file("/plan").id();
}

/**
 * Return a Container with nixpacks installed
 *
 * @function
 * @description Return a Container with nixpacks installed
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);
  const buildx = dag.container().from("docker/buildx-bin").file("/buildx");
  const ctr = dag
    .pipeline(Job.dev)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "nixpacks", "docker"])
    .withExec(["nixpacks", "--version"])
    .withExec(["docker", "-v"])
    .withExec(["mkdir", "-p", "/root/.docker/cli-plugins"])
    .withFile("/root/.docker/cli-plugins/docker-buildx", buildx)
    .withExec(["docker", "buildx", "version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withServiceBinding("dockerd", docker("25.0.3", true))
    .withEnvVariable("DOCKER_HOST", "tcp://dockerd:2375")
    .withDefaultTerminalCmd(["bash", "-i"]);

  await ctr.stdout();
  return ctr.id();
}

export type JobExec =
  | ((src: string | Directory, name: string, path?: string) => Promise<string>)
  | ((
      src: string | Directory,
      path?: string,
      format?: string
    ) => Promise<File | string>)
  | ((src?: string) => Promise<Container | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.build]: build,
  [Job.plan]: plan,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.build]: "Build an OCI image from your project using nixpacks",
  [Job.plan]:
    "Generate a plan for building an OCI image from your project using nixpacks",
  [Job.dev]: "Return a Container with nixpacks installed",
};
