import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Button from '../Button';

const stories = storiesOf('Atoms/Button', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.add('Overview', () => (
  <Button type={text('type', 'text')} use={text('use', 'primary')}>
    {text('children', 'Button')}
  </Button>
));
stories.add('Text Primary', () => <Button>Primary</Button>);
stories.add('Text Secondary', () => <Button use="secondary">Secondary</Button>);
stories.add('Text Danger', () => <Button use="danger">Danger</Button>);

stories.add('Outlined Primary', () => <Button type="outlined">Primary</Button>);
stories.add('Outlined Secondary', () => (
  <Button type="outlined" use="secondary">
    Secondary
  </Button>
));
stories.add('Outlined Danger', () => (
  <Button type="outlined" use="danger">
    Danger
  </Button>
));

stories.add('Contained Primary', () => (
  <Button type="contained">Primary</Button>
));
stories.add('Contained Secondary', () => (
  <Button type="contained" use="secondary">
    Secondary
  </Button>
));
stories.add('Contained Danger', () => (
  <Button type="contained" use="danger">
    Danger
  </Button>
));
