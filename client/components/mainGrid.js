import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
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
          type
          score
          title
          url
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

        console.log(data);

      return data.getFrontPage.map(({ id, type, score, title, url }) => (
        <tr>
          <td  style={styles.MainGridTh}>
            <div style={styles.MainGridRowContainer}>
              <Score score={score}></Score>
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
        </tr>
      ));
    }}
  </Query>
);

class MainGrid extends Component {
  render() {
    return (
      <Table bordered hover style={styles.MainGrid} size="sm">
        <tbody>
          <MainGridPost />
        </tbody>
      </Table>
    )
  }
}

export default MainGrid; 