import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Icon from '../Icon';

const stories = storiesOf('Atoms/Icon', module);
stories.addDecorator(withKnobs);
stories.add(
  'Overview',
  withInfo(`
    Description or documentation about Icon (supports markdown).
  
    ~~~js
    <Icon>Render this</Icon>
    ~~~
  
  `)(() => <Icon>{text('children', 'Click top-right to view the info.')}</Icon>)
);
stories.add('Another example', () => <Icon>Children</Icon>);
stories.add('Pass a className', () => <Icon className="myClassName" />);
stories.add('How to force a style', () => <Icon style={{ color: 'red' }} />);
