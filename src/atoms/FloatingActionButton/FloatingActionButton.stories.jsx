import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import FloatingActionButton from '../FloatingActionButton';
import Icon from '../../atoms/Icon';

const stories = storiesOf('Atoms/FloatingActionButton', module);
stories.addDecorator(withKnobs);
stories.add(
  'Overview',
  withInfo(`
    Description or documentation about FloatingActionButton (supports markdown).
  
    ~~~js
    <FloatingActionButton>Render this</FloatingActionButton>
    ~~~
  
  `)(() => (
    <FloatingActionButton
      mini={boolean('mini', false)}
      use={text('use', 'primary')}
    >
      {text('children', <Icon icon={['fas', 'plus']} />)}
    </FloatingActionButton>
  ))
);
stories.add('Primary', () => (
  <FloatingActionButton>
    <Icon icon={['fas', 'plus']} />
  </FloatingActionButton>
));
stories.add('Secondary', () => (
  <FloatingActionButton use="secondary">
    <Icon icon={['fas', 'pencil-alt']} />
  </FloatingActionButton>
));
stories.add('Danger', () => (
  <FloatingActionButton use="danger">
    <Icon icon={['fas', 'trash']} />
  </FloatingActionButton>
));
stories.add('Mini', () => (
  <FloatingActionButton mini use="danger">
    <Icon icon={['fas', 'trash']} />
  </FloatingActionButton>
));
