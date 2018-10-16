import React from 'react';
import styled from 'styled-components';

import { Layout } from 'antd';
import { rem } from 'polished';
import { Route } from 'react-router-dom';

import * as fonts from '../../styles/fonts';
import { spacingUnit } from '../../styles/variables';

import Menu from '../menu';
import Transactions from '../transactions';

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
`;

/**
 * Home Component
 */
function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

/**
 * Layout Component that handle React Router routing
 * @type {Component}
 */
const RouterLayout = () => (
    <Layout>
        <StyledHeader>
            <Logo>
                <LogoTitle>
                    <span role="img" aria-label="Money Bag">
                        💰
                    </span>{' '}
                    Wealth Tracker
                </LogoTitle>
            </Logo>
            <Menu />
        </StyledHeader>
        <StyledContent>
            <Route exact path="/" component={Home} />
            <Route exact path="/transactions" component={Transactions} />
        </StyledContent>
    </Layout>
);

export default RouterLayout;
