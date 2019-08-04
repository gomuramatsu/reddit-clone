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
        <tr><td><Link href="/post"><a>{title}</a></Link></td></tr>
      ));
    }}
  </Query>
);

class MainGrid extends Component {
  render() {
    return (
      <Table bordered hover>
        <tbody>
          <MainGridPost />
          {/* <tr>
          <td>1</td>
          </tr>
          <tr>
          <td>2</td>
          </tr>
          <tr>
          <td>3</td>
          </tr> */}
        </tbody>
      </Table>
    )
  }
}

export default MainGrid; 