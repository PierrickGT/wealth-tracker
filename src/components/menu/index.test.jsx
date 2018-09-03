import React from 'react';
import createRouterContext from 'react-router-test-context'
import { shallow } from 'enzyme';

import HeaderMenu from ".";

describe('my test', () => {
  it('renders', () => {
    const context = createRouterContext()
    const wrapper = shallow(<HeaderMenu />, { context })
    const { mode } = wrapper.props();

    expect(mode).toBe('horizontal')
  })
})
