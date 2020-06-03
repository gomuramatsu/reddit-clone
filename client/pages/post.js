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
import CommentCard from '../components/commentSection';
import NewCommentSection from '../components/newCommentSection';
import { useRouter } from 'next/router';

import { saveState } from '../components/util/localStorage';
import { Provider } from 'react-redux';
import { Store } from '../components/util/store';

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const GET_POST = gql`
  query getPost ($postId: String!){
    getPost (id: $postId) {
      id
      username
      score
      title
      body
    }
  }
`;

function PostCard (props){

  console.log('gonna get postcard!!');
  console.log(props);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: {postId: props.postId}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log({data});
  console.log(data.getPost.title);

  return renderPost(data.getPost.id, data.getPost.username, data.getPost.score, data.getPost.title, data.getPost.body);
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

function Post() {
  Store.subscribe(() => {
      console.log('state changed!!');
      saveState(Store.getState());
  })

  const router = useRouter();
  console.log(router.query.id);

  return (
    <ApolloProvider client={client}>
      <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
      />
      <Provider store={Store} >
        <MainNavBar></MainNavBar>
        <ApolloHooksProvider client={client}>
          <div>
            <PostCard postId={router.query.id}></PostCard>
            <CommentCard postId={router.query.id}></CommentCard>
            <NewCommentSection postId={router.query.id}></NewCommentSection>
          </div>
        </ApolloHooksProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default Post;