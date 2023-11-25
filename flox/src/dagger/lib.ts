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
    .withExec(["apt-get", "install", "-y", "curl", "git"])
    .withMountedCache("/nix", client.cacheVolume("nix-cache"))
    .withExec([
      "sh",
      "-c",
      '[ ! -f "/nix/receipt.json" ] && curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm; exit 0',
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

export const floxBase = (client: Client, name: string) =>
  nixBase(client, name)
    .withExec(["adduser", "--disabled-password", "flox"])
    .withExec(["addgroup", "flox", "nixbld"])
    .withExec([
      "sh",
      "-c",
      "echo 'extra-trusted-substituters = https://cache.floxdev.com' | tee -a /etc/nix/nix.conf && echo 'extra-trusted-public-keys = flox-store-public-0:8c/B+kjIaQ+BloCmNkRUKwaVPFWkriSAd0JJvuDu4F0=' | tee -a /etc/nix/nix.conf",
    ])
    .withExec([
      "nix",
      "profile",
      "install",
      "--impure",
      "--experimental-features",
      "nix-command flakes auto-allocate-uids",
      "--accept-flake-config",
      "github:flox/floxpkgs#flox.fromCatalog",
    ])
    .withExec(["flox", "--version"]);
