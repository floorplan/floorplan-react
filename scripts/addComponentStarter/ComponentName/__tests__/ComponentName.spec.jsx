import React from 'react';
import renderer from 'react-test-renderer';
import ComponentName from '../../ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ComponentName>Children</ComponentName>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
