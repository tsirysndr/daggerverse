import { Directory, Container, Secret } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { Client } from "../../sdk/client.gen.ts";
import { getDirectory, getAccessKey, getSecretKey } from "./lib.ts";

export enum Job {
  upload = "upload",
  dev = "dev",
}

export const exclude = [];

/**
 * @function
 * @description Uploads files to Cloudlare R2 bucket.
 * @param {string | Directory | undefined} src
 * @param {Secret | string} accessKey
 * @param {Secret | string} secretKey
 * @param {string} bucket
 * @param {string} endpoint
 * @param {string} region
 * @returns {Promise<string>}
 */
export async function upload(
  src: string | Directory | undefined = ".",
  accessKey: Secret | string,
  secretKey: Secret | string,
  bucket: string,
  endpointUrl: string,
  region = "us-east-1"
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const _accessKey = getAccessKey(client, accessKey);
    const _secretKey = getSecretKey(client, secretKey);

    if (!_accessKey || !_secretKey) {
      console.error("Missing ACCESS_KEY or SECRET_KEY");
      Deno.exit(1);
    }

    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "aws"])
      .withSecretVariable("ACCESS_KEY", _accessKey)
      .withSecretVariable("SECRET_KEY", _secretKey)
      .withExec([
        "bash",
        "-c",
        "aws configure set aws_access_key_id $ACCESS_KEY",
      ])
      .withExec([
        "bash",
        "-c",
        "aws configure set aws_secret_access_key $SECRET_KEY",
      ])
      .withExec(["bash", "-c", `aws configure set region ${region}`])
      .withExec([
        "aws",
        "s3",
        "sync",
        ".",
        "--endpoint-url",
        endpointUrl,
        `s3://${bucket}`,
        "--delete",
      ]);
    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Returns a container with AWS CLI installed.
 * @param {string | Directory | undefined} src
 * @returns {Promise<Container | string>}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.dev)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "aws"]);

    const result = await ctr.stdout();
    console.log(result);
    id = await ctr.id();
  });
  return id;
}

export type JobExec =
  | ((
      src: string,
      accessKey: Secret | string,
      secretKey: Secret | string,
      bucket: string,
      endpoint: string,
      region?: string
    ) => Promise<Container | Directory | string>)
  | ((src: string) => Promise<Container | Directory | string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.upload]: upload,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.upload]: "Uploads files to Cloudlare R2 bucket.",
  [Job.dev]: "Returns a container with AWS CLI installed.",
};
