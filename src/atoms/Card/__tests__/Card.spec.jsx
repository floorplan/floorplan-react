import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../../Card';

describe('Card', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Card>Children</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
