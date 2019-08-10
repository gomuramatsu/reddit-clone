import React, {Component} from "react";
import MainNavBar from '../components/nav';
import Card from 'react-bootstrap/Card'
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks' // https://github.com/apollographql/apollo-client/issues/2042#issuecomment-509041949

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const GET_POST = gql`
  query getPost ($postId: String!){
    getPost (id: $postId) {
      id
      title
      body
    }
  }
`;

// const GET_POST = gql`
//   query getPost ($postId: ID!){
//     getPost (id: $postId) {
//       title
//       body
//     }
//   }
// `;

// const PostCard = ({postId}) => (
//   <Query query={GET_POST} variables={{ postId }}>
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.posts.map(({ title, id }) => (
//         <div>
//           {title} {id}
//         </div>
//       ));
//     }}
//   </Query>
// );

function PostCard ({postId}){
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {postId},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log({data});

  return (
    <div>{data.getPost.title}{data.getPost.body}</div>
  );
};

class Post extends Component {
  static getInitialProps ({ query: { id } }) {
    return { id }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />
        <MainNavBar></MainNavBar>
        <Card>
          <ApolloHooksProvider client={client}>
            <PostCard postId={this.props.id}></PostCard>
          </ApolloHooksProvider>
          {this.props.id}
        </Card>
      </ApolloProvider>
    )
  }

  // render() {
  //   return (
  //     <ApolloProvider client={client}>
  //       <link
  //           rel="stylesheet"
  //           href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  //           integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  //           crossorigin="anonymous"
  //       />
  //       <MainNavBar></MainNavBar>
  //       <Card>
  //           <PostCard postId={this.props.id}></PostCard>
  //           {this.props.id}
  //       </Card>
  //     </ApolloProvider>
  //   )
  // }
}

export default Post;