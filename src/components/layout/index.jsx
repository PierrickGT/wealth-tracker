import gql from "graphql-tag";
import React from 'react';
import styled from 'styled-components';

import { Layout } from 'antd';
import { Query } from "react-apollo";
import { rem } from 'polished';
import { Route, withRouter } from 'react-router-dom';

import * as fonts from '../../styles/fonts';
import { spacingUnit } from '../../styles/variables';

import Menu from '../menu';

/**
 * Layout wrapper, in which Header, Sider, Content, Footer or Layout itself
 * can be nested, and can be placed in any parent container
 * @type {Wrapper}
 */
const { Header, Content } = Layout;

/**
 * Header style
 * @type {Component}
 */
const StyledHeader = styled(Header)`
    align-items: center;
    display: flex;
    height: auto;
    line-height: 1;
    padding: 0 ${spacingUnit(4)};
`;

/**
 * Logo style
 * @type {Component}
 */
const Logo = styled.div`
    display: inline-flex;
`;

/**
 * LogoTitle style
 * @type {Component}
 */
const LogoTitle = styled.h1`
    color: white;
    font-family: ${fonts.family.montserrat};
    padding-right: ${spacingUnit(2)};
    font-size: ${fonts.size.big};
    letter-spacing: ${rem(1)};
`;

/**
 * Content style
 * @type {Component}
 */
const StyledContent = styled(Content)`
    padding: ${spacingUnit(4)} ${spacingUnit(8)};
`

/**
 * Home Component
 */
function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}

/**
 * Transactions Component
 */
function Transactions() {
    return (
        <Query
          query={gql`
              {
                transactions(page: 1, limit: 25) {
              	docs {
              		id
              		date
              		description
              		account
              		amount
              		category
              		sub_category
              	},
              	pages,
              	total
                }
              }
          `}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                    return data.transactions.docs.map(transaction => (
                        <div key={transaction.id}>
                            <p>{transaction.amount}</p>
                        </div>
                    ));
                }}
        </Query>
    )
}

/**
 * Layout Component that handle React Router routing
 * @type {Component}
 */
const RouterLayout = withRouter(() => (
    <Layout>
        <StyledHeader>
            <Logo>
                <LogoTitle>
                    <span role="img" aria-label="Money Bag">💰</span> Wealth Tracker
                </LogoTitle>
            </Logo>
            <Menu />
        </StyledHeader>
        <StyledContent>
            <Route exact path="/" component={Home} />
            <Route exact path="/transactions" component={Transactions} />
        </StyledContent>
    </Layout>
));

export default RouterLayout;
