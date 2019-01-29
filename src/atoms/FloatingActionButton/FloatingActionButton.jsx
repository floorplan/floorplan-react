/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

import shadows from '../../theme/shadows';
import colors from '../../theme/colors';

const defaultCSS = ({ use, mini }) => css`
  box-shadow: ${shadows.level5};
  background-color: ${colors[use]};
  color: ${colors[`${use}Text`]};
  height: ${mini ? '40px' : '56px'};
  min-width: ${mini ? '40px' : '56px'};
  border-radius: ${mini ? '20px' : '28px'};
  border: none;
  font-size: 16px;
  line-height: ${mini ? '38px' : '54px'};
  /* padding: 0 ${mini ? '20px' : '28px'}; */
`;

const FloatingActionButton = ({
  children,
  component: FloatingActionButtonComponent,
  use,
  mini,
  ...props
}) => (
  <FloatingActionButtonComponent css={defaultCSS({ use, mini })} {...props}>
    {children}
  </FloatingActionButtonComponent>
);

FloatingActionButton.propTypes = {
  children: PropTypes.node,
  component: PropTypes.node,
  use: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  mini: PropTypes.bool
};

FloatingActionButton.defaultProps = {
  children: null,
  component: 'button',
  use: 'primary',
  mini: false
};

FloatingActionButton.displayName = 'FloatingActionButton';

export default FloatingActionButton;
