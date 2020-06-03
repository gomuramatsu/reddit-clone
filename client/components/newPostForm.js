import React, {Component, useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import gql from "graphql-tag";
import styles from "./style";
import { useMutation } from '@apollo/react-hooks';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks' // https://github.com/apollographql/apollo-client/issues/2042#issuecomment-509041949
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import Router from 'next/router';
import { connect } from 'react-redux';

const CREATE_POST = gql`
  mutation createPost ($username: String!, $type: String!, $title: String!, $body: String, $url: String){
    createPost (username: $username, type: $type, title: $title, body: $body, url: $url) {
      username
      id
      title
      body
      url
    }
  }
`;

function CreatePostFormWithHook(props) {

  console.log(props);

  var titleInput = React.createRef(); 
  var bodyInput = React.createRef(); 
  var urlInput = React.createRef(); 

  const [createPost, { data }] = useMutation(CREATE_POST, {
    onCompleted: (returnData) => {
      console.log(returnData);
      Router.push({
        pathname: '/post',
        query: { id: returnData.createPost.id },
      });
    }
  });

  if (props.postType == 'text') {
    return (
      <Form style={styles.FormPadding} onSubmit={
        e => {
          console.log('submitted text');
          console.log(props);

          e.preventDefault();
          var title = (titleInput.current == null ? '' : titleInput.current.value);
          var body = (bodyInput.current == null ? '' : bodyInput.current.value);
          console.log('hi');
          console.log(title);
          console.log(body);
          createPost({ variables: { username: props.username, type: 'text', title: title, body: body } });
          console.log('hi2');
        }
      }>
        <Form.Group controlId="formTitle">
            <Form.Control ref={titleInput} type="text" placeholder="Enter Title"/>
        </Form.Group>
        <Form.Group controlId="formBody"> 
            <Form.Control ref={bodyInput} as="textarea" rows="4" placeholder="Text (Optional)"/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>
    )
  } else if (props.postType == 'link') {
    return (
      <Form style={styles.FormPadding} onSubmit={
        e => {
          console.log('submitted LINK');
          console.log(props);

          e.preventDefault();
          var title = (titleInput.current == null ? '' : titleInput.current.value);
          var url = (urlInput.current == null ? '' : encodeURI(urlInput.current.value));
          
          createPost({ variables: { username: props.username, type: 'link', title: title, url: url  } });
        }
      }>
        <Form.Group controlId="formTitle">
            <Form.Control ref={titleInput} type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group controlId="formBody">
            <Form.Control ref={urlInput} type="text" placeholder="Enter URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = function(state) {
  return {
      username: state.username,
      loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(CreatePostFormWithHook);