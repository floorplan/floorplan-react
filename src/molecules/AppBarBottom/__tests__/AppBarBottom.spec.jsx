import React from 'react';
import renderer from 'react-test-renderer';
import AppBarBottom from '../../AppBarBottom';

describe('AppBarBottom', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<AppBarBottom>Children</AppBarBottom>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
