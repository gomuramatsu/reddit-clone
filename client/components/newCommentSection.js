import React, {Component} from "react";
import styles from "./style";
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Button from './Button';
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
      Router.reload();
    }
  });

  return (
    <form onSubmit={
      e => {
        console.log('submitted');
        e.preventDefault();
        var commentText = (commentInput.current == null ? '' : commentInput.current.value);
        createComment({ variables: { username: props.username, postId:props.postId, comment: commentText } });
      }
    }>
      <textarea className="textAreaContainer" ref={commentInput} rows="4" placeholder="Enter comment"/>
      <div>
        <div className="submitContainer">
          <Button text="Submit">
          </Button>
        </div>
        <div className="clear"></div>
      </div>
    </form>
  )
};

const mapStateToProps = function(state) {
  return {
      username: state.username,
      loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(NewCommentSection);