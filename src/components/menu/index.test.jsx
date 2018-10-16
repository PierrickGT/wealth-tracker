import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import { HeaderMenu } from '.';

describe('<Menu />', () => {
    HeaderMenu.contextTypes = {
        router: PropTypes.shape({})
    };

    it('should display home tab by default', () => {
        const wrapper = shallow(<HeaderMenu location={{ pathname: '/' }} />);
        const { current } = wrapper.state();

        expect(current).toBe('/');
    });

    it('should display transactions tab', () => {
        const wrapper = shallow(
            <HeaderMenu location={{ pathname: '/transactions' }} />
        );
        const { current } = wrapper.state();

        expect(current).toBe('/transactions');
    });

    it('should call handleClick function', () => {
        const spy = jest.spyOn(HeaderMenu.prototype, 'handleClick');
        const wrapper = shallow(
            <HeaderMenu location={{ pathname: '/' }} onClick={spy} />
        );

        wrapper.instance().handleClick({ key: '/transactions' });
        expect(spy).toHaveBeenCalled();
    });
});
