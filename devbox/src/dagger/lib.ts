import Client, { Directory, DirectoryID } from "../../deps.ts";

export const getDirectory = (
  client: Client,
  src: string | Directory | undefined = "."
) => {
  if (typeof src === "string" && src.startsWith("core.Directory")) {
    return client.directory({
      id: src as DirectoryID,
    });
  }
  return src instanceof Directory ? src : client.host().directory(src);
};

export const nixBase = (client: Client, name: string) =>
  client
    .pipeline(name)
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

export const devboxBase = (client: Client, name: string) =>
  nixBase(client, name)
    .withExec(["adduser", "--disabled-password", "devbox"])
    .withExec(["addgroup", "devbox", "nixbld"])
    .withEnvVariable("FORCE", "1")
    .withExec(["sh", "-c", "curl -fsSL https://get.jetpack.io/devbox | bash"])
    .withExec([
      "sh",
      "-c",
      `echo 'eval "$(devbox global shellenv)"' >> ~/.bashrc`,
    ])
    .withExec(["devbox", "version"]);
