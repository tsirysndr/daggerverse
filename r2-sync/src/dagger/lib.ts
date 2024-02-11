import { Directory, DirectoryID, Secret, SecretID } from "../../deps.ts";
import { Client } from "../../sdk/client.gen.ts";
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

export const getAccessKey = async (client: Client, token?: string | Secret) => {
  if (Deno.env.get("ACCESS_KEY")) {
    return client.setSecret("ACCESS_KEY", Deno.env.get("ACCESS_KEY")!);
  }
  if (token && typeof token === "string") {
    try {
      const secret = client.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return client.setSecret("ACCESS_KEY", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};

export const getSecretKey = async (client: Client, token?: string | Secret) => {
  if (Deno.env.get("SECRET_KEY")) {
    return client.setSecret("SECRET_KEY", Deno.env.get("SECRET_KEY")!);
  }
  if (token && typeof token === "string") {
    try {
      const secret = client.loadSecretFromID(token as SecretID);
      await secret.id();
      return secret;
    } catch (_) {
      return client.setSecret("SECRET_KEY", token);
    }
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
