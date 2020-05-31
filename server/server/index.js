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

const users = [
  {
    userId: 'user123',
    firebaseUID: 'ZDabxE75ukYANgaNZ5zmW71Thi23'
  }
]

const comments = [
  {
    id: '1',
    postId: '1',
    userId: 'user123',
    comment: 'Hello this is a comment~',
    score: 5
  },
  {
    id: '2',
    postId: '1',
    userId: 'user123',
    comment: 'Hello this is a SECOND COMMEND',
    score: 2
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # The "Query" type is the root of all GraphQL queries.
  type Query {
    getFrontPage: [Post]
    getPost(id: String!): Post
    getComments(postId: String!): [Comment]
  }

  type Mutation {
    createPost(userId: String!, type: String!, title: String!, body: String, url: String): Post
    addVote(id: String!, vote: Int!): Post
    addCommentVote(id: String!, vote: Int!): Comment
  }
  
  type Post {
    type: String!
    id: String!
    userId: String!
    score: Int!
    title: String
    url: String
    body: String
  }

  type Author {
    id: String
    name: String
  }

  type Comment {
    id: String!
    postId: String!
    userId: String!
    comment: String!
    score: Int!
  }

  type User {
    userId: String!
    firebaseUID: String!
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "posts" array above.
const resolvers = {
  Query: {
    getFrontPage: () => posts,
    getPost(obj, args, context, info) {
      return find(posts, { id: args.id });
    },
    getComments(obj, args, context, info){
      let returnComments = [];
      for (var i = 0; i <comments.length; i++ ){
        if (comments[i].postId == args.postId){
          returnComments.push(comments[i]);
        }
      }
      return returnComments;
    }
  },
  Mutation: {
    createPost(obj, args, context, info) {
      console.log(args);

      var newPost = {};
      
      newPost.id = crypto.randomBytes(16).toString("hex");
      newPost.userId = args.userId;
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
    },
    addVote(obj, args, context, info) {
      var post = find(posts, { id: args.id });
      post.score += args.vote;
      return post;
    },
    addCommentVote(obj, args, context, info) {
      var post = find(comments, { id: args.id });
      post.score += args.vote;
      return post;
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