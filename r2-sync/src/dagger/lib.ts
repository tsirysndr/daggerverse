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

export const getAccessKey = async (token?: string | Secret) => {
  if (Deno.env.get("ACCESS_KEY")) {
    return dag.setSecret("ACCESS_KEY", Deno.env.get("ACCESS_KEY")!);
  }
  if (token && typeof token === "string") {
    try {
      const secret = dag.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return dag.setSecret("ACCESS_KEY", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};

export const getSecretKey = async (token?: string | Secret) => {
  if (Deno.env.get("SECRET_KEY")) {
    return dag.setSecret("SECRET_KEY", Deno.env.get("SECRET_KEY")!);
  }
  if (token && typeof token === "string") {
    try {
      const secret = dag.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return dag.setSecret("SECRET_KEY", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
