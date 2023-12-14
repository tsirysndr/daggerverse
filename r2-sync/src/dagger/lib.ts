import { Directory, DirectoryID, Secret, SecretID } from "../../deps.ts";
import { Client } from "../../sdk/client.gen.ts";

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

export const getAccessKey = (client: Client, token?: string | Secret) => {
  if (Deno.env.get("ACCESS_KEY")) {
    return client.setSecret("ACCESS_KEY", Deno.env.get("ACCESS_KEY")!);
  }
  if (token && typeof token === "string") {
    if (token.startsWith("core.Secret")) {
      return client.loadSecretFromID(token as SecretID);
    }
    return client.setSecret("ACCESS_KEY", token);
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};

export const getSecretKey = (client: Client, token?: string | Secret) => {
  if (Deno.env.get("SECRET_KEY")) {
    return client.setSecret("SECRET_KEY", Deno.env.get("SECRET_KEY")!);
  }
  if (token && typeof token === "string") {
    if (token.startsWith("core.Secret")) {
      return client.loadSecretFromID(token as SecretID);
    }
    return client.setSecret("SECRET_KEY", token);
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
