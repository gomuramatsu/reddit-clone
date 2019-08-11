import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import Link from 'next/link';
import styles from "./style";

const MainGridPost = () => (
  <Query
    query={gql`
      {
        getFrontPage {
          id
          type
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

      return data.getFrontPage.map(({ id, type, title, url }) => (
        <tr>
          <td  style={styles.MainGridTh}>
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