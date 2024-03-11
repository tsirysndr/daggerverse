/**
 * @module nixpacks
 * @description This module provides a set of functions to build an OCI image from your project using nixpacks.
 */
import { Secret } from "../../deps.ts";
import { dag, Directory, Container, File } from "../../deps.ts";
import { docker, getRegistryPassword } from "./lib.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  build = "build",
  plan = "plan",
  dev = "dev",
  publish = "publish",
}

export const exclude = [];

const DOCKER_VERSION = "25.0.3";

/**
 * Build an OCI image from your project using nixpacks
 *
 * @function
 * @description Build an OCI image from your project using nixpacks
 * @param {string | Directory | undefined} src
 * @returns {Promise<string>}
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
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "ca-certificates"])
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "nixpacks", "docker"])
    .withExec(["nixpacks", "--version"])
    .withExec(["docker", "-v"])
    .withExec(["mkdir", "-p", "/root/.docker/cli-plugins"])
    .withFile("/root/.docker/cli-plugins/docker-buildx", buildx)
    .withExec(["docker", "buildx", "version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withServiceBinding("dockerd", docker(DOCKER_VERSION, true))
    .withEnvVariable("DOCKER_HOST", "tcp://dockerd:2375")
    .withExec(["nixpacks", "build", path, "--name", name]);
  return ctr.stdout();
}

/**
 * Generate a plan for building an OCI image from your project using nixpacks
 *
 * @function
 * @description Generate a plan for building an OCI image from your project using nixpacks
 * @param {string | Directory | undefined} src
 * @returns {Promise<File |string>}
 */
export async function plan(
  src: string | Directory,
  path: string | undefined = ".",
  format: string | undefined = "json"
): Promise<File | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.plan)
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
 * @returns {Promise<string>}
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
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "ca-certificates"])
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "nixpacks", "docker"])
    .withExec(["nixpacks", "--version"])
    .withExec(["docker", "-v"])
    .withExec(["mkdir", "-p", "/root/.docker/cli-plugins"])
    .withFile("/root/.docker/cli-plugins/docker-buildx", buildx)
    .withExec(["docker", "buildx", "version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withServiceBinding("dockerd", docker(DOCKER_VERSION, true))
    .withEnvVariable("DOCKER_HOST", "tcp://dockerd:2375")
    .withDefaultTerminalCmd(["bash", "-i"]);

  await ctr.stdout();
  return ctr.id();
}

/**
 * Publish an OCI image to a registry
 *
 * @function
 * @description Publish an OCI image to a registry
 * @param {string} username
 * @param {string | Secret} password
 * @param {string} ref
 * @param {string | undefined} registry
 * @returns {Promise<string>}
 */
export async function publish(
  username: string,
  password: string | Secret,
  ref: string,
  registry: string | undefined = "docker.io"
): Promise<string> {
  const secret = await getRegistryPassword(password);
  const ctr = dag
    .pipeline(Job.publish)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "ca-certificates"])
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "docker"])
    .withExec(["docker", "-v"])
    .withServiceBinding("dockerd", docker(DOCKER_VERSION, true))
    .withEnvVariable("DOCKER_HOST", "tcp://dockerd:2375")
    .withSecretVariable("REGISTRY_PASSWORD", secret!)
    .withExec([
      "bash",
      "-c",
      `echo $REGISTRY_PASSWORD | docker login ${registry} -u ${username} --password-stdin`,
    ])
    .withExec(["docker", "push", ref]);
  return ctr.stdout();
}

export type JobExec =
  | ((src: string | Directory, name: string, path?: string) => Promise<string>)
  | ((
      src: string | Directory,
      path?: string,
      format?: string
    ) => Promise<File | string>)
  | ((src?: string) => Promise<Container | string>)
  | ((
      username: string,
      password: string | Secret,
      ref: string,
      registry: string | undefined
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.build]: build,
  [Job.plan]: plan,
  [Job.publish]: publish,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.build]: "Build an OCI image from your project using nixpacks",
  [Job.plan]:
    "Generate a plan for building an OCI image from your project using nixpacks",
  [Job.publish]: "Publish an OCI image to a registry",
  [Job.dev]: "Return a Container with nixpacks installed",
};
