import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Button from '../Button';

const stories = storiesOf('Atoms/Button', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.add('Overview', () => (
  <Button styleType={text('type', 'text')} use={text('use', 'primary')}>
    {text('children', 'Button')}
  </Button>
));
stories.add('Text Primary', () => <Button>Primary</Button>);
stories.add('Text Secondary', () => <Button use="secondary">Secondary</Button>);
stories.add('Text Danger', () => <Button use="danger">Danger</Button>);

stories.add('Outlined Primary', () => (
  <Button styleType="outlined">Primary</Button>
));
stories.add('Outlined Secondary', () => (
  <Button styleType="outlined" use="secondary">
    Secondary
  </Button>
));
stories.add('Outlined Danger', () => (
  <Button styleType="outlined" use="danger">
    Danger
  </Button>
));

stories.add('Contained Primary', () => (
  <Button styleType="contained">Primary</Button>
));
stories.add('Contained Secondary', () => (
  <Button styleType="contained" use="secondary">
    Secondary
  </Button>
));
stories.add('Contained Danger', () => (
  <Button styleType="contained" use="danger">
    Danger
  </Button>
));

stories.add('ALL', () => (
  <>
    <Button>Primary</Button>
    <Button use="secondary">Secondary</Button>
    <Button use="danger">Danger</Button>
    <Button styleType="outlined">Primary</Button>
    <Button styleType="outlined" use="secondary">
      Secondary
    </Button>
    <Button styleType="outlined" use="danger">
      Danger
    </Button>
    <Button styleType="contained">Primary</Button>
    <Button styleType="contained" use="secondary">
      Secondary
    </Button>
    <Button styleType="contained" use="danger">
      Danger
    </Button>
  </>
));
