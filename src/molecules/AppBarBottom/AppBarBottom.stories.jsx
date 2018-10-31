import React from 'react';
import { css } from 'emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import AppBarBottom from '../AppBarBottom';

import FAB from '../../atoms/FloatingActionButton';
import Icon from '../../atoms/Icon';

const fabClassName = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const menuContainerClassName = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const menuLeftClassName = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 50%;

  svg {
    margin: 12px;
  }
`;
const menuRightClassName = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 50%;

  svg {
    margin: 12px;
  }
`;

const stories = storiesOf('Molecules/AppBarBottom', module);
stories.addDecorator(withKnobs);
stories.add(
  'Overview',
  withInfo(`
    Description or documentation about AppBarBottom (supports markdown).
  
    ~~~js
    <AppBarBottom>Render this</AppBarBottom>
    ~~~
  
  `)(() => (
    <AppBarBottom>
      {/* {text('children', 'Click top-right to view the info.')} */}
      <div className={menuContainerClassName}>
        <div className={menuLeftClassName}>
          <Icon icon={['fas', 'bars']} />
        </div>
        <div className={menuRightClassName}>
          <Icon icon={['fas', 'calendar']} />
          <Icon icon={['fas', 'pencil-alt']} />
        </div>
      </div>
      <FAB use="secondary" className={fabClassName}>
        <Icon icon={['fas', 'plus']} />
      </FAB>
    </AppBarBottom>
  ))
);
stories.add('Another example', () => <AppBarBottom>Children</AppBarBottom>);
stories.add('Pass a className', () => <AppBarBottom className="myClassName" />);
stories.add('How to force a style', () => (
  <AppBarBottom style={{ color: 'red' }} />
));
