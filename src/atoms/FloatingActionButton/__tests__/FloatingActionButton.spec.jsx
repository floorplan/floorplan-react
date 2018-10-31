import React from 'react';
import renderer from 'react-test-renderer';
import FloatingActionButton from '../../FloatingActionButton';

describe('FloatingActionButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<FloatingActionButton>Children</FloatingActionButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
