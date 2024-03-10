import { dag, Directory, DirectoryID, CacheSharingMode } from "../../deps.ts";

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
