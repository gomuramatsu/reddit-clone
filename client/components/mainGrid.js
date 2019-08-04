import React, {Component} from "react";
import Table from 'react-bootstrap/Table';
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import Link from 'next/link';

const MainGridPost = () => (
  <Query
    query={gql`
      {
        posts {
          title
          body
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.posts.map(({ title, body }) => (
        <tr>
          <td  className="mainGridTh">
            <Link href="/post">
              <a className="mainGridTitle">{title}</a>
            </Link>
            <div className="mainGridDetails">small details and link to comments</div>
          </td>
        </tr>
      ));
    }}
  </Query>
);

class MainGrid extends Component {
  render() {
    return (
      <Table bordered hover className="mainGrid" size="sm">
        <tbody>
          <MainGridPost />
        </tbody>
      </Table>
    )
  }
}

export default MainGrid; 