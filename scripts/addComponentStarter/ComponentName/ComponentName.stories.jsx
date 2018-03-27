import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import ComponentName from '../ComponentName';

const stories = storiesOf('ComponentType/ComponentName', module);
stories.addDecorator(withKnobs);
stories.add(
  'Overview',
  withInfo(`
    Description or documentation about ComponentName (supports markdown).
  
    ~~~js
    <ComponentName>Render this</ComponentName>
    ~~~
  
  `)(() => <ComponentName>{text('children', 'Click top-right to view the info.')}</ComponentName>)
);
stories.add('Another example', () => <ComponentName>Children</ComponentName>);
stories.add('Pass a className', () => <ComponentName className="myClassName" />);
stories.add('How to force a style', () => <ComponentName style={{ color: 'red' }} />);
