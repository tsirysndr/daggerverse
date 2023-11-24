import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  list,
  nonNull,
} from "../../deps.ts";

import { install, dev } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("install", {
      args: {
        pkgs: nonNull(list(nonNull(stringArg()))),
      },
      resolve: async (_root, args, _ctx) => await install(args.pkgs),
    });
    t.string("dev", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await dev(args.dev || undefined),
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
  install: "container",
  dev: "container",
  "dev.src": "directory",
});

export { schema };
