/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

import shadows from '../../theme/shadows';

const defaultCSS = ({ level }) => css`
  padding: 12px;
  box-shadow: ${shadows[level]}
  border-radius: 6px;
`;

const Card = ({ children, component: CardComponent, level, ...props }) => (
  <CardComponent css={defaultCSS({ level })} {...props}>
    {children}
  </CardComponent>
);

Card.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf(['level1', 'level2', 'level3', 'level4', 'level5']),
  component: PropTypes.node
};

Card.defaultProps = {
  children: null,
  level: 'level1',
  component: 'div'
};

Card.displayName = 'Card';

export default Card;
