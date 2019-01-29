/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

import colors from '../../theme/colors';

const defaultCSS = use => css`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 60px;
  background-color: ${colors[use]};
  color: ${colors[`${use}Text`]};
  display: flex;
  padding: 12px;
`;

const AppBarBottom = ({ component: AppBarBottomComponent, use, ...props }) => (
  <AppBarBottomComponent css={defaultCSS(use)} {...props} />
);

AppBarBottom.propTypes = {
  component: PropTypes.node,
  use: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

AppBarBottom.defaultProps = {
  component: 'nav',
  use: 'primary'
};

AppBarBottom.displayName = 'AppBarBottom';

export default AppBarBottom;
