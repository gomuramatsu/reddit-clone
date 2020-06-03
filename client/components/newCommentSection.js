import React, {Component} from "react";
import styles from "../components/style";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Router from 'next/router';

const CREATE_COMMENT = gql`
  mutation createComment ($username: String!, $postId: String!, $comment: String!){
    createComment (username: $username, postId: $postId, comment: $comment) {
      id
      username
    }
  }
`;

function NewCommentSection (props){
  var commentInput = React.createRef(); 

  const [createComment, { data }] = useMutation(CREATE_COMMENT, {
    onCompleted: (returnData) => {
      console.log(returnData);
      console.log('hi');
      console.log(props);
      console.log('hi2');
      // Router.push({
      //   pathname: '/post',
      //   query: { id: props.postId }
      // });
      Router.reload();
    }
  });

  return (<Form style={styles.FormPadding} onSubmit={
    e => {
      console.log('submitted comment');
      console.log(props);

      

      e.preventDefault();
      var commentText = (commentInput.current == null ? '' : commentInput.current.value);
      createComment({ variables: { username: props.username, postId:props.postId, comment: commentText } });
      console.log(commentText);
    }
  }>
    <Form.Group controlId="formBody"> 
        <Form.Control ref={commentInput} as="textarea" rows="4" placeholder="Enter comment"/>
    </Form.Group>
    <Button variant="primary" type="submit">
        Submit
    </Button>
  </Form>)
};


const mapStateToProps = function(state) {
  return {
      username: state.username,
      loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(NewCommentSection);