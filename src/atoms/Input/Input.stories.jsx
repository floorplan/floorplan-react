import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Input from '../Input';
import Icon from '../../atoms/Icon';

const stories = storiesOf('Atoms/Input', module);
stories.addDecorator(withKnobs);
stories.add(
  'Overview',
  withInfo(`
    Description or documentation about Input (supports markdown).
  
    ~~~js
    <Input>Render this</Input>
    ~~~
  
  `)(() => (
    <Input
      label={text('label', 'Label')}
      helperText={text('helperText', 'This is some helper text.')}
      use={text('use', 'primary')}
    />
  ))
);
stories.add('Outlined Primary', () => (
  <Input label="Label" helperText="This is some helper text." use="primary" />
));
stories.add('Outlined Secondary', () => (
  <Input label="Label" helperText="This is some helper text." use="secondary" />
));
stories.add('Outlined Danger', () => (
  <Input
    label="Label"
    helperText="There was an error with this field."
    use="danger"
  />
));
stories.add('Outlined Primary Signifier Icon', () => (
  <Input
    label="Label"
    helperText="Use todays date"
    signifierIcon={<Icon icon={['fas', 'calendar']} />}
  />
));
stories.add('Outlined Primary Action Icon', () => (
  <Input
    label="Label"
    helperText="This is the wrong value"
    use="secondary"
    actionIcon={<Icon icon={['fas', 'exclamation-circle']} />}
  />
));
