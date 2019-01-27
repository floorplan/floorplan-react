import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Card from '../Card';

const stories = storiesOf('Atoms/Card', module);
stories.addDecorator(withKnobs);
stories.add(
  'Overview',
  withInfo(`
    Description or documentation about Card (supports markdown).
  
    ~~~js
    <Card>Render this</Card>
    ~~~
  
  `)(() => <Card>{text('children', 'Click top-right to view the info.')}</Card>)
);
stories.add('Another example', () => <Card>Children</Card>);
stories.add('Pass a className', () => <Card className="myClassName" />);
stories.add('How to force a style', () => <Card style={{ color: 'red' }} />);
