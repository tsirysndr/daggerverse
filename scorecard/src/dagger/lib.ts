import { dag, Directory, DirectoryID, Secret, SecretID } from "../../deps.ts";

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

export const getGithubAuthToken = async (token?: string | Secret) => {
  if (Deno.env.get("GITHUB_AUTH_TOKEN")) {
    return dag.setSecret(
      "GITHUB_AUTH_TOKEN",
      Deno.env.get("GITHUB_AUTH_TOKEN")!
    );
  }
  if (token && typeof token === "string") {
    try {
      const secret = dag.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return dag.setSecret("GITHUB_AUTH_TOKEN", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
