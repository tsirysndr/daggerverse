import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
  list,
} from "../../deps.ts";

import { run, dev, install } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("run", {
      args: {
        src: nonNull(stringArg()),
        command: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await run(args.src, args.command),
    });
    t.string("dev", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await dev(args.src || undefined),
    });
    t.string("install", {
      args: {
        src: stringArg(),
        pkgs: nonNull(list(nonNull(stringArg()))),
      },
      resolve: async (_root, args, _ctx) =>
        await install(args.src || undefined, args.pkgs),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "run.src": "directory",
  "dev.src": "directory",
  "install.src": "directory",
  run: "container",
  dev: "container",
  install: "container",
});

export { schema };
