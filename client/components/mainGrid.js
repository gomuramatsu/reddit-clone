import React, {Component} from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import Link from 'next/link';
import styles from "./style";
import Score from '../components/score';

const MainGridPost = () => (
  <Query
    query={gql`
      {
        getFrontPage {
          id
          username
          type
          score
          title
          url
          numberOfComments
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;

      if (error) {
        return <p>Error :(</p>;
      }

      console.log(data);

      return data.getFrontPage.map(({ id, username, type, score, title, url, numberOfComments }) => (
        <div className="postCardContainer">
          <Score score={score} id={id}></Score>
          <div>
            {
              type == 'text' ?
                <Link href={{
                  pathname: '/post', query: { id: id }}
                } >
                  <a className="postTitleFont">{title}</a>
                </Link> :
                <a className="postTitleFont">{title}</a>
            }
            <div className="postUserFont">{username}</div>
            <Link href={{ pathname: '/post', query: { id: id }}}>
              <div className="postCommentFont">{numberOfComments} comments</div>
            </Link>
          </div>
        </div>
      ));
    }}
  </Query>
);

class MainGrid extends Component {
  render() {
    return (
      <div className="mainContainer">
        <MainGridPost />
      </div>
    )
  }
}

export default MainGrid; 