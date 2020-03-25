import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTpyes, mergeTypes } from "merge-graphql-schemas";
import path from "path";

// **는 모든 폴더, *는 모든 파일
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.js"))

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;