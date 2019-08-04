import React from "react";
import Home from "./home";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
global.fetch = require('node-fetch');

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <Home />
        </div>
    </ApolloProvider>
)
export default App;