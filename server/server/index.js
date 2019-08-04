const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const posts = [
  {
    id: '1',
    title: 'Welcome to my reddit clone!',
    body: 'insert body here'
  },
  {
    id: '2',
    title: 'Google search takes 7 seconds on certain queries',
    url: 'https://twitter.com/liron/status/1157327854033674241'
  },
  {
    id: '3',
    title: '~Another text post~',
    body: 'another body'
  },
  {
    id: '4',
    title: 'Bill Gates Resume (1974)',
    url: 'https://image.cnbcfm.com/api/v1/image/104645467-BillGatesearlyresume.jpg?v=1529475934'
  },
  {
    id: '5',
    title: 'Why Developers Hate Coding Skills Tests and What Hiring Managers Can Do',
    url: 'https://hackernoon.com/why-developers-hate-coding-skills-8m6u3za1'
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # The "Query" type is the root of all GraphQL queries.
  type Query {
    posts: [Post]
  }

  type Post {
    id: String
    title: String!
    url: String
    body: String
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    posts: () => posts,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});