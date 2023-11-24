import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
} from "../../deps.ts";

import { setupNix } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("setupNix", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) =>
        await setupNix(args.src || undefined),
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
  "setupNix.src": "directory",
  setupNix: "container",
});

export { schema };
