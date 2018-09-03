import React from 'react';
import renderer from 'react-test-renderer';

import RouterLayout from ".";

it('renders correctly', () => {
  const tree = renderer
    .create(<RouterLayout />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
