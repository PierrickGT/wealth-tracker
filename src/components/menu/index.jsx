import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

/**
 * HeaderMenu Component
 */
export class HeaderMenu extends Component {
    /**
     * Creates an instance of HeaderMenu
     * @param {Object} props Component props
     */
    constructor(props) {
        super(props);

        /**
         * Component State
         * @type {Object}
         */
        this.state = {
            current: '/'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * React lifecycle
     * @param  {Object} props Component props
     * @param  {Object} state Component state
     * @return {State}       Return null or new component state
     */
    static getDerivedStateFromProps(props, state) {
        const locationPathname = props.location && props.location.pathname;

        if (locationPathname !== state.current) {
            return {
                current: locationPathname
            };
        }

        return null;
    }

    /**
     * Function to set current item active in menu
     * @param  {Object} event onClick event object
     * @return {State} Return state with the current item active
     */
    handleClick(event) {
        const { current } = this.state;

        if (event.key !== current) {
            this.setState({
                current: event.key
            });
        }
    }

    /**
     * React lifecycle
     */
    render() {
        const { current } = this.state;

        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[current]}
                mode="horizontal"
                theme="dark"
            >
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" />
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="/transactions">
                    <Link to="/transactions">
                        <Icon type="credit-card" />
                        Transactions
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

HeaderMenu.displayName = 'HeaderMenu';

HeaderMenu.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string })
};

export default withRouter(HeaderMenu);
