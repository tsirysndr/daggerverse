import { dag, Directory, DirectoryID } from "../../deps.ts";

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

export const nixBase = (name: string) =>
  dag
    .pipeline(name)
    .container()
    .from("ubuntu:latest")
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "curl"])
    .withMountedCache("/nix", dag.cacheVolume("nix-cache-dir"))
    .withMountedCache("/etc/nix", dag.cacheVolume("nix-etc-config"))
    .withExec([
      "sh",
      "-c",
      "[ -f /etc/nix/group ] && cp /etc/nix/group /etc/group; exit 0",
    ])
    .withExec([
      "sh",
      "-c",
      "[ -f /etc/nix/passwd ] && cp /etc/nix/passwd /etc/passwd; exit 0",
    ])
    .withExec([
      "sh",
      "-c",
      "[ -f /etc/nix/shadow ] && cp /etc/nix/shadow /etc/shadow; exit 0",
    ])
    .withExec([
      "sh",
      "-c",
      '[ ! -f "/nix/receipt.json" ] && curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm; exit 0',
    ])
    .withExec(["cp", "/etc/group", "/etc/nix/group"])
    .withExec(["cp", "/etc/passwd", "/etc/nix/passwd"])
    .withExec(["cp", "/etc/shadow", "/etc/nix/shadow"])
    .withExec([
      "sed",
      "-i",
      "s/auto-allocate-uids = true/auto-allocate-uids = false/g",
      "/etc/nix/nix.conf",
    ])
    .withEnvVariable("PATH", "${PATH}:/nix/var/nix/profiles/default/bin", {
      expand: true,
    });

export const devenvBase = (name: string) =>
  nixBase(name)
    .withExec(["adduser", "--disabled-password", "devenv"])
    .withExec(["addgroup", "devenv", "nixbld"])
    .withEnvVariable("USER", "root")
    .withExec([
      "sh",
      "-c",
      'echo "trusted-users = root $USER" | tee -a /etc/nix/nix.conf',
    ])
    .withExec([
      "nix",
      "profile",
      "install",
      "--accept-flake-config",
      "github:cachix/cachix",
    ])
    .withExec(["cachix", "use", "devenv"])
    .withExec([
      "nix",
      "profile",
      "install",
      "--accept-flake-config",
      "github:cachix/devenv/latest",
    ])
    .withExec(["devenv", "version"]);
