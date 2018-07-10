import React from 'react';
import { hot } from 'react-hot-loader';

import Layout from './layout';

const App = () => (
    <h1>
        <Layout />
        Hello, world. yeah<br />
    </h1>
);

export default hot(module)(App);
