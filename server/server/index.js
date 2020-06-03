const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');
const crypto = require("crypto");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

const posts = [
  {
    id: '1',
    username: 'user123',
    type: 'text',
    score: 8,
    title: 'Welcome to my reddit clone!',
    body: 'insert body here',
    numberOfComments: 2
  },
  {
    id: '2',
    username: 'user123',
    type: 'link',
    score: 7,
    title: 'Google search takes 7 seconds on certain queries',
    url: 'https://twitter.com/liron/status/1157327854033674241',
    numberOfComments: 0
  },
  {
    id: '3',
    username: 'user123',
    type: 'text',
    score: 3,
    title: '~Another text post~',
    body: 'another body',
    numberOfComments: 0
  },
  {
    id: '4',
    username: 'user123',
    type: 'link',
    score: 25,
    title: 'Bill Gates Resume (1974)',
    url: 'https://image.cnbcfm.com/api/v1/image/104645467-BillGatesearlyresume.jpg?v=1529475934',
    numberOfComments: 0
  },
  {
    id: '5',
    username: 'user123',
    type: 'link',
    score: 5,
    title: 'Why Developers Hate Coding Skills Tests and What Hiring Managers Can Do',
    url: 'https://hackernoon.com/why-developers-hate-coding-skills-8m6u3za1',
    numberOfComments: 0
  }
];

const users = [
  {
    username: 'user123',
    firebaseUID: 'ZDabxE75ukYANgaNZ5zmW71Thi23'
  }
]

const comments = [
  {
    id: '1',
    postId: '1',
    username: 'user123',
    comment: 'Hello this is a comment~',
    score: 5
  },
  {
    id: '2',
    postId: '1',
    username: 'user123',
    comment: 'Hello this is another comment!',
    score: 2
  }
]

const usernameSet = new Set(['user123'])

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # The "Query" type is the root of all GraphQL queries.
  type Query {
    getFrontPage: [Post]
    getPost(id: String!): Post
    getComments(postId: String!): [Comment]
    isUsernameAlreadyTaken(username: String!): UserExists
  }

  type Mutation {
    createPost(username: String!, type: String!, title: String!, body: String, url: String): Post
    createComment(username: String!, postId: String!, comment: String!): Comment
    addVote(id: String!, vote: Int!): Post
    addCommentVote(id: String!, vote: Int!): Comment
    addUser(username: String!, firebaseUID: String!): User
  }
  
  type Post {
    type: String!
    id: String!
    username: String!
    score: Int!
    title: String!
    url: String
    body: String
    numberOfComments: Int!
  }

  type Author {
    id: String
    name: String
  }

  type Comment {
    id: String!
    postId: String!
    username: String!
    comment: String!
    score: Int!
  }

  type User {
    username: String!
    firebaseUID: String!
  }

  type UserExists {
    userExists: Boolean!
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
    },
    isUsernameAlreadyTaken(obj, args, context, info){
      console.log('isUsernameAlreadyTaken');
      console.log(args.username + " is taken:");
      console.log(usernameSet.has(args.username));
      return {userExists: usernameSet.has(args.username)};
    }
  },
  Mutation: {
    createPost(obj, args, context, info) {
      console.log(args);

      var newPost = {};
      
      newPost.id = crypto.randomBytes(16).toString("hex");
      newPost.username = args.username;
      newPost.title = args.title;
      newPost.type = args.type; 
      newPost.score = 0; 
      newPost.numberOfComments = 0;

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
    },
    addUser(obj, args, context, info) {
      console.log('adding user to username set...');
      console.log(args.username);
      console.log(args.firebaseUID);
      // add to the username cache
      usernameSet.add(args.username);

      // add to the User object
      var newUserObject = {
        username: args.username,
        firebaseUID: args.firebaseUID
      }
      users.push(newUserObject);
      return newUserObject; 
    },
    createComment(obj, args, context, info) {
      var newComment = {};
      newComment.id = crypto.randomBytes(16).toString("hex");
      newComment.postId = args.postId; 
      newComment.username = args.username;
      newComment.comment = args.comment;
      newComment.score = 0;
      comments.push(newComment);
      return newComment; 
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