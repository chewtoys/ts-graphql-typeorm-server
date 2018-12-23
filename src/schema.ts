import * as fs from 'fs';
import * as path from 'path';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

const schemas: GraphQLSchema[] = [];

const folders = fs.readdirSync(path.join(__dirname + '/modules')) as string[];

folders.forEach(folder => {
  const { resolvers } = require(`./modules/${folder}`);
  const typeDefs = importSchema(
    path.join(__dirname + `/modules/${folder}/schema.graphql`)
  );
  schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
});

export default mergeSchemas({ schemas });
