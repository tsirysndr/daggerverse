import {
  dag,
  Directory,
  type DirectoryID,
  Secret,
  type SecretID,
  CacheSharingMode,
} from "../deps.ts";

export const getDirectory = async (
  src: string | Directory | undefined = "."
) => {
  if (src instanceof Directory) {
    return src;
  }
  if (typeof src === "string") {
    try {
      const directory = dag.loadDirectoryFromID(src as DirectoryID);
      await directory.id();
      return directory;
    } catch (_) {
      return dag.host
        ? dag.host().directory(src)
        : dag.currentModule().source().directory(src);
    }
  }
  return dag.host
    ? dag.host().directory(src)
    : dag.currentModule().source().directory(src);
};

export const docker = (version = "24.0", cached = false) => {
  let ctr = dag
    .container()
    .from(`docker:${version}-dind`)
    .withEnvVariable("DOCKER_CLI_EXPERIMENTAL", "enabled")
    .withoutEntrypoint()
    .withExposedPort(2375);

  if (cached) {
    ctr = ctr.withMountedCache(
      "/var/lib/docker",
      dag.cacheVolume(`docker-engine-state-${version}`),
      {
        sharing: CacheSharingMode.Locked,
      }
    );
  }
  return ctr
    .withExec(["apk", "update"])
    .withExec(["apk", "add", "ca-certificates"])
    .withExec(["sh", "-c", "rm -rf /var/cache/apk/*"])
    .withExec(["update-ca-certificates"])
    .withExec(
      [
        "dockerd",
        "--host=tcp://0.0.0.0:2375",
        "--host=unix:///var/run/docker.sock",
        "--tls=false",
      ],
      {
        insecureRootCapabilities: true,
      }
    )
    .asService();
};

export const getRegistryPassword = async (password: string | Secret) => {
  if (Deno.env.get("REGISTRY_PASSWORD")) {
    return dag.setSecret(
      "REGISTRY_PASSWORD",
      Deno.env.get("REGISTRY_PASSWORD")!
    );
  }
  if (password && typeof password === "string") {
    try {
      const secret = dag.loadSecretFromID(password as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return dag.setSecret("REGISTRY_PASSWORD", password);
    }
  }
  if (password && password instanceof Secret) {
    return password;
  }
  return undefined;
};
