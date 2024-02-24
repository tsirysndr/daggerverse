/**
 * @module flakestry
 * @description Publish a flake from Github to flakestry.dev
 */

import Client, { Directory, Container } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  publish = "publish",
}

export const exclude = [];

/**
 * @function
 * @description Publish a flake to flakestry.dev
 * @param {string | Directory} src
 * @returns {string}
 */
export async function publish(
  src: string | Directory,
  version: string,
  ref: string,
  ghToken: string,
  actionsIdTokenRequestToken: string,
  actionsIdTokenRequestUrl: string,
  url = "https://flakestry.dev",
  ignoreConflicts = false
): Promise<string> {
  let output = "";
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const ctr = client
      .pipeline(Job.publish)
      .container()
      .from("ubuntu:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "curl", "jq"])
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
      })
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["sh", "-c", "echo null > metadata.err"])
      .withExec(["sh", "-c", "echo null > metadata.json"])
      .withExec(["sh", "-c", "echo null > outputs.json"])
      .withExec([
        "bash",
        "-c",
        'nix flake metadata --json > metadata.json 2> metadata.err || echo "nix flake metadata --json failed"',
      ])
      .withExec([
        "sh",
        "-c",
        'nix flake show --json --all-systems > outputs.json 2> outputs.err || echo "nix flake show --json --all-systems failed',
      ])
      .withExec([
        "bash",
        "-c",
        "[ ! -e metadata.json ] && echo null > metadata.json; exit 0",
      ])
      .withEnvVariable("VERSION", Deno.env.get("VERSION") || version)
      .withEnvVariable("REF", Deno.env.get("REF") || ref)
      .withEnvVariable("GH_TOKEN", Deno.env.get("GH_TOKEN") || ghToken)
      .withEnvVariable("URL", Deno.env.get("URL") || url)
      .withEnvVariable(
        "ACTIONS_ID_TOKEN_REQUEST_TOKEN",
        Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN") ||
          actionsIdTokenRequestToken
      )
      .withEnvVariable(
        "ACTIONS_ID_TOKEN_REQUEST_URL",
        Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_URL") || actionsIdTokenRequestUrl
      )
      .withEnvVariable(
        "IGNORE_CONFLICTS",
        Deno.env.get("IGNORE_CONFLICTS") || `${ignoreConflicts}`
      )
      .withExec([
        "bash",
        "-c",
        "[ ! -e outputs.json ] && echo null > outputs.json; exit 0",
      ])
      .withExec([
        "bash",
        "-c",
        `\
        RESPONSE=$(curl -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=$URL")
        OIDC=$(echo $RESPONSE | jq -r '.value')
        README=$(find . -iname "README*" -maxdepth 1 -print -quit)

        nix run nixpkgs#jo \
          metadata=:metadata.json \
          metadata_error=@metadata.err \
          outputs=:outputs.json \
          outputs_errors=@outputs.err \
          readme="$README" \
          version="$VERSION" \
          ref="$REF" \
        > publish.json

        echo "Publishing to $URL"

        curl --fail-with-body -w '%{http_code}' -o /dev/stderr > http_code \
             -H 'Content-Type: application/json' \
             -H "Github-Token: $GH_TOKEN" \
             -H "Authorization: Bearer $OIDC" \
             -d @publish.json \
             -X POST $URL/api/publish \
        || ([ "$IGNORE_CONFLICTS" = 'true' ] && grep -qxF 409 http_code)
        `,
      ]);

    const stdout = await ctr.stdout();
    const stderr = await ctr.stderr();
    output = stdout + "\n" + stderr;
  });

  return output;
}

export type JobExec = (
  src: string | Directory,
  version: string,
  ref: string,
  ghToken: string,
  actionsIdTokenRequestToken: string,
  actionsIdTokenRequestUrl: string,
  url?: string,
  ignoreConflicts?: boolean
) => Promise<Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.publish]: publish,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.publish]: "Publish a flake to flakestry.dev",
};
