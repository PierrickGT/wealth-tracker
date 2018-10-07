import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout';

import { BANKIN_CRAWLER_API_ENDPOINT } from '../Constants'

/**
 * Bankin Crawler Appolo Client
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  uri: BANKIN_CRAWLER_API_ENDPOINT
});

/**
 * App Component
 */
const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <Layout />
        </Router>
    </ApolloProvider>
);

export default App;
