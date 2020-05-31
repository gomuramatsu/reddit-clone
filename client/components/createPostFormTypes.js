import React, {Component, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import styles from "./style";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'; // https://github.com/apollographql/apollo-client/issues/2042#issuecomment-509041949
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { connect } from 'react-redux';
import CreatePostFormWithHook from './newPostForm';

//https://stackoverflow.com/a/52782464
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

function CreatePostForm(props) {
  const [postType, setPostType] = useState("text");

  return (
    <div>
        <div style={styles.CreatePostNavStyle}>
          <Nav fill variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="createTextPostFormSelected" onSelect={() => setPostType('text')}>Text</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="createLinkPostFormSelected" onSelect={() => setPostType('link')}>Link</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <CreatePostFormWithHook postType={postType}></CreatePostFormWithHook>
          </ApolloHooksProvider>
        </ApolloProvider>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
      user: state.user,
      loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(CreatePostForm);