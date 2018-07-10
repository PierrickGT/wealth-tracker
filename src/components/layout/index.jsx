import PropTypes from 'prop-types';
import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export default function() {
    return (
        <Layout>
            <Header>
                <div className="logo" />
            </Header>
            <Content>
                <p>Content</p>
            </Content>
            <Footer>
                <p>Wealth Tracker © 2018</p>
            </Footer>
        </Layout>
    );
}
