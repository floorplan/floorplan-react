import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import shadows from '../../theme/shadows';
const defaultClassName = ({ level }) => css`
  padding: 12px;
  box-shadow: ${shadows[level]}
  border-radius: 6px;
`;

export default class Card extends Component {
  displayName = 'Card';
  render() {
    const {
      children,
      className,
      component: CardComponent,
      level,
      ...props
    } = this.props;

    return (
      <CardComponent
        className={cx(className, defaultClassName({ level }))}
        {...props}
      >
        {children}
      </CardComponent>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  level: PropTypes.oneOf(['level1', 'level2', 'level3', 'level4', 'level5']),
  component: PropTypes.node
};

Card.defaultProps = {
  children: null,
  className: '',
  level: 'level1',
  component: 'div'
};
