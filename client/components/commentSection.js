import React, {Component} from "react";
import MainNavBar from '../components/nav';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import styles from "../components/style";
import Score from '../components/score';


const GET_COMMENTS = gql`
query getComments ($postId: String!){
  getComments (postId: $postId) {
    id
    username
    postId
    score
    comment
  }
}
`;

function renderComments(comments) {
  console.log(comments);
  var commentDivs = [];
  for (var i = 0; i < comments.length; i++){
    commentDivs.push(
      <tr>
        <td style={styles.MainGridTh}>
          <div style={styles.MainGridRowContainer}>
            <Score type='comment' score={comments[i].score} id={comments[i].id}></Score>
            <div style={styles.CommentSectionTextContainer}>
              <div style={styles.CommentSectionTextContainer}>
                {comments[i].comment}
              </div>
              <div style={styles.CommentSectionItemUserContainer}>
                {comments[i].username}
              </div>
            </div>
          </div>
        </td>
      </tr>
      )
  }
  
  return commentDivs;
}

function CommentCard (props){
  console.log('gonna get comments');
  console.log(props);
  console.log(typeof props.postId);

  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: {postId: props.postId}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('got comments!');
  console.log({data});
  console.log(data);
  
  var cards = renderComments(data.getComments);
  return (<Table bordered hover style={styles.CommentSectionContainer} size="sm">
    <tbody>
      {cards}
    </tbody>
  </Table>)
};



export default CommentCard;