import React from "react";
import Home from "./home";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Store } from '../components/util/store';
import { Provider } from 'react-redux';

global.fetch = require('node-fetch');

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

console.log(Store);

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <Provider store={Store} >
                <Home />
            </Provider>
        </div>
    </ApolloProvider>
)
export default App;