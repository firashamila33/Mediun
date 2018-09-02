import {
  makeExecutableSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Article {
  _id: ID!
  createdAt: String
  title: String                
  description: String
}

type ArticleFeed {
  cursor: Int!
  articles: [Article]!
}

type ArticleId {
  _id: String
}


type Query {
  articles: [Article]  
  articleFeed(cursor: String): ArticleFeed 
}

type Mutation {
  addArticle(title: String!, description: String!): Article
  editArticle(_id: ID!, title: String!, description: String!): Article
  deleteArticle(_id: ID!): Article
}

type Subscription {
  articleAdded: Article
  articleDeleted: ArticleId
  articleEdited: Article
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
