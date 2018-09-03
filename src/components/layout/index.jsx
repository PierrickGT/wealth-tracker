import { Layout } from 'antd';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Menu from '../menu';

/**
 * Layout wrapper, in which Header, Sider, Content, Footer or Layout itself
 * can be nested, and can be placed in any parent container
 * @type {Wrapper}
 */
const { Header, Content } = Layout;

/**
 * Home Component
 */
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

/**
 * Transactions Component
 */
const Transactions = () => (
    <div>
        <h2>Transactions</h2>
    </div>
);

/**
 * Layout Component that handle React Router routing
 * @type {Component}
 */
const RouterLayout = withRouter(() => (
    <Layout>
        <Header>
            <div className="logo" />
            <Menu />
        </Header>
        <Content>
            <Route exact path="/" component={Home} />
            <Route exact path="/transactions" component={Transactions} />
        </Content>
    </Layout>
));

export default RouterLayout;
