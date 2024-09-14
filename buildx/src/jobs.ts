/**
 * @module buildx
 * @description This module provides a set of functions to build an OCI image from your project using buildx.
 */
import type { Secret } from "../deps.ts";
import { dag, type Directory, type Container, type File } from "../deps.ts";
import { docker, getRegistryPassword } from "./helpers.ts";
import { getDirectory } from "./helpers.ts";

export enum Job {
  build = "build",
  dev = "dev",
  publish = "publish",
}

export const exclude = [];

const DOCKER_VERSION = "25.0.3";
const DOCKER_HOST = "tcp://dockerd:2375";

/**
 * Build an OCI image from your project using buildx
 *
 * @function
 * @description Build an OCI image from your project using buildx
 * @param {string | Directory | undefined} src
 * @param {string} tag
 * @param {string | undefined} platform
 * @param {string | undefined} path
 * @returns {Promise<string>}
 */
export async function build(
  src: string | Directory,
  tag: string,
  platform: string | undefined = "linux/amd64",
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
    .withExec(["pkgx", "install", "docker"])
    .withExec(["docker", "-v"])
    .withExec(["mkdir", "-p", "/root/.docker/cli-plugins"])
    .withFile("/root/.docker/cli-plugins/docker-buildx", buildx)
    .withExec(["docker", "buildx", "version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withServiceBinding("dockerd", docker(DOCKER_VERSION, true))
    .withEnvVariable("DOCKER_HOST", DOCKER_HOST)
    .withExec(["docker", "buildx", "create", "--name", "mybuilder", "--use"])
    .withExec(["docker", "buildx", "inspect", "--bootstrap"])
    .withExec([
      "docker",
      "buildx",
      "build",
      "--platform",
      platform,
      "-t",
      tag,
      path,
    ]);
  return ctr.stdout();
}

/**
 * Return a Container with Docker Buildx installed
 *
 * @function
 * @description Return a Container with Docker Buildx installed
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
    .withExec(["pkgx", "install", "docker"])
    .withExec(["docker", "-v"])
    .withExec(["mkdir", "-p", "/root/.docker/cli-plugins"])
    .withFile("/root/.docker/cli-plugins/docker-buildx", buildx)
    .withExec(["docker", "buildx", "version"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withServiceBinding("dockerd", docker(DOCKER_VERSION, true))
    .withEnvVariable("DOCKER_HOST", DOCKER_HOST)
    .withExec(["docker", "buildx", "create", "--name", "mybuilder", "--use"])
    .withExec(["docker", "buildx", "inspect", "--bootstrap"])
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
    .withEnvVariable("DOCKER_HOST", DOCKER_HOST)
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
  [Job.publish]: publish,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.build]: "Build an OCI image from your project using buildx",
  [Job.publish]: "Publish an OCI image to a registry",
  [Job.dev]: "Return a Container with Docker Buildx installed",
};
