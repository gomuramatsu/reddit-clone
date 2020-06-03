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
    // commentDivs.push(
    //   <Card style={styles.PostCard}>
    //     <Card.Body style={styles.MainGridRowContainer}>
    //       <Score type='comment' score={comments[i].score} id={comments[i].id}></Score>
    //       <Card.Text>
    //         {comments[i].comment}
    //       </Card.Text>
    //     </Card.Body>
    //   </Card>
    // )
    commentDivs.push(
    <tr>
      <td  style={styles.MainGridTh}>
        <div style={styles.MainGridRowContainer}>
          <Score type='comment' score={comments[i].score} id={comments[i].id}></Score>
          <div style={styles.MainGridTextContainer}>
            {comments[i].comment}
          </div>
          <div>
          {comments[i].username}
          </div>
        </div>
      </td>
    </tr>
    )
  }
  
  return commentDivs;
}

{/* <tr>
  <td  style={styles.MainGridTh}>
    <div style={styles.MainGridRowContainer}>
      <Score score={score} id={id}></Score>
      <div style={styles.MainGridTextContainer}>
        {
          type == 'text' ?
            <Link href={{
              pathname: '/post', query: { id: id }}
            } >
              <a style={styles.MainGridTitle}>{title}</a>
            </Link> :
            <a href={url} style={styles.MainGridTitle}>{title}</a>
        }
        <Link href={{ pathname: '/post', query: { id: id }}}>
          <div style={styles.MainGridDetails}>small details and link to comments</div>
        </Link>
      </div>
    </div>
  </td>
</tr> */}


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
  
  // return renderComment(data.getComments.id, data.getComments.userId, data.getComments.score, data.getComments.comment);
  var cards = renderComments(data.getComments);
  // return (<div>{cards}</div>)
  return (<Table bordered hover style={styles.MainGrid} size="sm">
  <tbody>
    {cards}
  </tbody>
</Table>)
};



export default CommentCard;