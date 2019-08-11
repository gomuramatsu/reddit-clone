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
import Router from 'next/router'

const CREATE_POST = gql`
  mutation createPost ($type: String!, $title: String!, $body: String, $url: String){
    createPost (type: $type, title: $title, body: $body, url: $url) {
      id
      title
      body
      url
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const initialState = {
  type: 'text'
};

function CreatePostFormWithHook(createPostFormState) {

  var titleInput = React.createRef(); 
  var bodyInput = React.createRef(); 
  var urlInput = React.createRef(); 

  const [createPost, { data }] = useMutation(CREATE_POST, {
    onCompleted: (returnData) => {
      Router.push({
        pathname: '/post',
        query: { id: returnData.createPost.id },
      });
    }
  });

  if (createPostFormState.formType == 'text') {
    return (
      <Form style={styles.FormPadding} onSubmit={
        e => {
          e.preventDefault();
          var title = (titleInput.current == null ? '' : titleInput.current.value);
          var body = (bodyInput.current == null ? '' : bodyInput.current.value);
          createPost({ variables: { type: 'text', title: title, body: body  } });
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
  } else if (createPostFormState.formType == 'link') {
    return (
      <Form style={styles.FormPadding} onSubmit={
        e => {
          e.preventDefault();
          var title = (titleInput.current == null ? '' : titleInput.current.value);
          var url = (urlInput.current == null ? '' : encodeURI(urlInput.current.value));
          console.log(url);
          createPost({ variables: { type: 'link', title: title, url: url  } });
          //todo - get id and go to site/post?id
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

class CreatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.updateFormType = this.updateFormType.bind(this);
  }

  updateFormType(type){
    if (type == 'text'){
      this.setState(state => ({
        showTextForm: true,
        showURLForm: false,
        type: 'text'
      }));
    } else if (type == 'link'){
      this.setState(state => ({
        showTextForm: false,
        showURLForm: true,
        type: 'link'
      }));
    }
  }

  render() {
      return (
          <div>
              <div style={styles.CreatePostNavStyle}>
                <Nav fill variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="createTextPostFormSelected" onSelect={() => this.updateFormType('text')}>Text</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="createLinkPostFormSelected" onSelect={() => this.updateFormType('link')}>Link</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                  <CreatePostFormWithHook formType={this.state.type}></CreatePostFormWithHook>
                </ApolloHooksProvider>
              </ApolloProvider>
          </div>
      )
  }
}

export default CreatePostForm; 