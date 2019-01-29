/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import AppBarBottom from '../AppBarBottom';

import FAB from '../../atoms/FloatingActionButton';
import Icon from '../../atoms/Icon';

const fabCss = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const menuContainerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const menuLeftCss = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 50%;

  svg {
    margin: 12px;
  }
`;
const menuRightCss = css`
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
      <div css={menuContainerCss}>
        <div css={menuLeftCss}>
          <Icon icon={['fas', 'bars']} />
        </div>
        <div css={menuRightCss}>
          <Icon icon={['fas', 'calendar']} />
          <Icon icon={['fas', 'pencil-alt']} />
        </div>
      </div>
      <FAB use="secondary" css={fabCss}>
        <Icon icon={['fas', 'plus']} />
      </FAB>
    </AppBarBottom>
  ))
);
stories.add('Another example', () => <AppBarBottom>Children</AppBarBottom>);
stories.add('Pass a className', () => <AppBarBottom className="myCss" />);
stories.add('How to force a style', () => (
  <AppBarBottom style={{ color: 'red' }} />
));
