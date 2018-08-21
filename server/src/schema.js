import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
  } from 'graphql-tools';
  
  import { resolvers } from './resolvers';
  
  const typeDefs = `
  type Channel {
    id: ID!
    name: String
  }
  type Query {
    channels: [Channel]    
  }
  `;
  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  export { schema };
  