import React, {Component} from "react";
import MainNavBar from '../components/nav';
import Card from 'react-bootstrap/Card'
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks' // https://github.com/apollographql/apollo-client/issues/2042#issuecomment-509041949
import styles from "../components/style";
import Score from '../components/score';

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const GET_POST = gql`
  query getPost ($postId: String!){
    getPost (id: $postId) {
      id
      score
      title
      body
    }
  }
`;

function PostCard ({postId}){
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {postId},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log({data});
  console.log(data.getPost.title);

  return renderPost(data.getPost.id, data.getPost.score, data.getPost.title, data.getPost.body);
};

function CommentCard (){
  return renderComments();
};

function renderPost(id, score, title, body) {
  return (
    <Card style={styles.PostCard}>
      <Card.Body style={styles.MainGridRowContainer}>
        <Score score={score} id={id}></Score>
        <Card.Title  style={styles.PostTextContainer} >{title}</Card.Title>
        <Card.Text>
          {body}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function renderComments() {
  return (
    <Card style={styles.PostCard}>
      <Card.Body>
        <Card.Title>todo</Card.Title>
        <Card.Text>
          comment content todo
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

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
        <ApolloHooksProvider client={client}>
          <div>
            <PostCard postId={this.props.id}></PostCard>
            <CommentCard></CommentCard>
          </div>
          
        </ApolloHooksProvider>
      </ApolloProvider>
    )
  }
}

export default Post;