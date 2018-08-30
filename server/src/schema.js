import {
  makeExecutableSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Article {
  id: ID!
  createdAt: String
  title: String                
  description: String
}

type ArticleFeed {
  cursor: String!
  articles: [Article]!
}


type Query {
  articles: [Article]  
  articleFeed(cursor: String): ArticleFeed 
}

type Mutation {
  addArticle(title: String!, description: String!): Article
  editArticle(id: ID!, title: String!, description: String!): Article
  deleteArticle(id: ID!): Article
}

type Subscription {
  articleAdded: Article
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
