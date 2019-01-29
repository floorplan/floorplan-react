/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

import colors from '../../theme/colors';

const defaultCSS = use => css`
  padding: 9px 15px;
  color: ${colors[use]};
  text-transform: uppercase;
  border-radius: 3px;
  border: 2px solid rgba(0, 0, 0, 0);
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors[`${use}Light`]};
    border: 2px solid ${colors[`${use}Light`]};
    color: ${colors[`${use}Text`]};
  }
`;

const outlinedCSS = use => css`
  border: 2px solid ${colors[use]};
  color: ${colors[use]};

  &:hover {
    background-color: ${colors[use]};
    color: ${colors[`${use}Text`]};
  }
`;

const containedCSS = use => css`
  border: 2px solid ${colors[use]};
  background-color: ${colors[use]};
  color: ${colors[`${use}Text`]};

  &:hover {
    background-color: ${colors[use]};
    color: ${colors[`${use}Text`]};
  }
`;

const Button = ({
  children,
  component: ButtonComponent,
  styleType,
  use,
  ...props
}) => (
  <ButtonComponent
    css={[
      defaultCSS(use),
      styleType === 'outlined' && outlinedCSS(use),
      styleType === 'contained' && containedCSS(use)
    ]}
    {...props}
  >
    {children}
  </ButtonComponent>
);

Button.propTypes = {
  children: PropTypes.node,
  component: PropTypes.node,
  styleType: PropTypes.oneOf(['text', 'outlined', 'contained']),
  use: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

Button.defaultProps = {
  children: null,
  component: 'button',
  styleType: 'text',
  use: 'primary'
};

Button.displayName = 'Button';

export default Button;
