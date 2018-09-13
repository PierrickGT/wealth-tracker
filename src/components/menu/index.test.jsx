import React from 'react';
import PropTypes from 'prop-types';
import createRouterContext from 'react-router-test-context'
import { shallow } from 'enzyme';

import HeaderMenu from ".";

describe('<Menu />', () => {
    HeaderMenu.contextTypes = {
        router: PropTypes.shape({})
    }

    it('should display home tab by default', () => {
        const context = createRouterContext()
        const wrapper = shallow(<HeaderMenu />, { context })
        const { current } = wrapper.state();

        expect(current).toBe('home');
    })

    it('should display transactions tab', () => {
        const context = createRouterContext()
        const spy = jest.fn();
        const wrapper = shallow(<HeaderMenu onClick={spy} />, { context });

        expect(wrapper.state('current')).toBe('home');
        wrapper.simulate('click', { key: 'transactions' })
        expect(wrapper.state('current')).toBe('transactions');
    })
})
