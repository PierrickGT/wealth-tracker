import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * HeaderMenu Component
 */
export default class HeaderMenu extends Component {
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
            current: 'home'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Function to set current item active in menu
     * @param  {Object} event onClick event object
     * @return {State} Return state with the current item active
     */
    handleClick(event) {
        this.setState({
            current: event.key
        });
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
                <Menu.Item key="home">
                    <Link to="/">
                        <Icon type="home" />Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="transactions">
                    <Link to="/transactions">
                        <Icon type="credit-card" />Transactions
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
