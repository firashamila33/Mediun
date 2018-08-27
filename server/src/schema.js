import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Article {
  id: ID!
  title: String                
  description: String
}

type Query {
  articles: [Article]   
}

type Mutation {
  addArticle(title: String!, description: String!): Article
  editArticle(id: ID!, title: String!, description: String!): Article
  deleteArticle(id: ID!): Article
}


`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
