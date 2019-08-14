const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');
const crypto = require("crypto");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

const posts = [
  {
    id: '1',
    type: 'text',
    score: 8,
    title: 'Welcome to my reddit clone!',
    body: 'insert body here'
  },
  {
    id: '2',
    type: 'link',
    score: 7,
    title: 'Google search takes 7 seconds on certain queries',
    url: 'https://twitter.com/liron/status/1157327854033674241'
  },
  {
    id: '3',
    type: 'text',
    score: 3,
    title: '~Another text post~',
    body: 'another body'
  },
  {
    id: '4',
    type: 'link',
    score: 25,
    title: 'Bill Gates Resume (1974)',
    url: 'https://image.cnbcfm.com/api/v1/image/104645467-BillGatesearlyresume.jpg?v=1529475934'
  },
  {
    id: '5',
    type: 'link',
    score: 5,
    title: 'Why Developers Hate Coding Skills Tests and What Hiring Managers Can Do',
    url: 'https://hackernoon.com/why-developers-hate-coding-skills-8m6u3za1'
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # The "Query" type is the root of all GraphQL queries.
  type Query {
    getFrontPage: [Post]
    getPost(id: String!): Post
  }

  type Mutation {
    createPost(type: String!, title: String!, body: String, url: String): Post
  }
  
  type Post {
    type: String!
    id: String!
    score: Int!
    title: String
    url: String
    body: String
  }

  type Author {
    id: String
    name: String
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    getFrontPage: () => posts,
    getPost(obj, args, context, info) {
      return find(posts, { id: args.id });
    }
  },
  Mutation: {
    createPost(obj, args, context, info) {
      var newPost = {};
      
      newPost.id = crypto.randomBytes(16).toString("hex");
      newPost.title = args.title;
      newPost.type = args.type; 
      newPost.score = 0; 

      if (args.type == "text") {
        if (args.body != null) {
          newPost.body = args.body;
        }
      } else if (args.type == "link") {
        if (args.url != null) {
          newPost.url = args.url;
        }
      }

      console.log('new post added')
      console.log(newPost);
      
      posts.push(newPost);
      return newPost;
    }
  }
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