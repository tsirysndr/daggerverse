import Client, { Directory, DirectoryID } from "../../deps.ts";

export const getDirectory = async (
  client: Client,
  src: string | Directory | undefined = "."
) => {
  if (src instanceof Directory) {
    return src;
  }
  if (typeof src === "string") {
    try {
      const directory = client.loadDirectoryFromID(src as DirectoryID);
      await directory.id();
      return directory;
    } catch (_) {
      return client.host
        ? client.host().directory(src)
        : client.currentModule().source().directory(src);
    }
  }
  return client.host
    ? client.host().directory(src)
    : client.currentModule().source().directory(src);
};

export const nixBase = (client: Client, name: string) =>
  client
    .pipeline(name)
    .container()
    .from("ubuntu:latest")
    .withExec(["apt-get", "update"])
    .withExec(["apt-get", "install", "-y", "curl"])
    .withMountedCache("/nix", client.cacheVolume("nix-cache-dir"))
    .withMountedCache("/etc/nix", client.cacheVolume("nix-etc-config"))
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

export const devboxBase = (client: Client, name: string) =>
  nixBase(client, name)
    .withExec(["adduser", "--disabled-password", "devbox"])
    .withExec(["addgroup", "devbox", "nixbld"])
    .withEnvVariable("FORCE", "1")
    // .withEnvVariable("DEVBOX_DEBUG", "1")
    .withExec(["sh", "-c", "curl -fsSL https://get.jetpack.io/devbox | bash"])
    .withExec([
      "sh",
      "-c",
      `echo 'eval "$(devbox global shellenv --recompute)"' >> ~/.bashrc`,
    ])
    .withExec(["devbox", "version"]);
