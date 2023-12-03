import { schema } from "./mod.ts";

const queryType = schema.getQueryType();
const queryField = queryType?.getFields()["install"];

console.log(queryField?.args[0].type.toString());
