import { brightGreen, stringifyTree } from "../../deps.ts";
import { jobDescriptions } from "./index.ts";
import { runnableJobs } from "./jobs/desc.ts";
import { Job } from "./jobs/mod.ts";

const tree = {
  name: brightGreen("pkgx_pipeline"),
  children: (Object.keys(runnableJobs) as Job[]).map((job) => ({
    name: jobDescriptions[job]
      ? `${brightGreen(job)} - ${jobDescriptions[job]}`
      : brightGreen(job),
    children: [],
  })),
};

console.log(
  stringifyTree(
    tree,
    (t) => t.name,
    (t) => t.children
  )
);
