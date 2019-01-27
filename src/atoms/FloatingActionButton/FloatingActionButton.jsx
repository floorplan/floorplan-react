import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import shadows from '../../theme/shadows';
import colors from '../../theme/colors';

const defaultClassName = (use, mini) => css`
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

export default class FloatingActionButton extends Component {
  displayName = 'FloatingActionButton';
  render() {
    const {
      children,
      className,
      component: FloatingActionButtonComponent,
      use,
      mini,
      ...props
    } = this.props;

    return (
      <FloatingActionButtonComponent
        className={cx(className, defaultClassName(use, mini))}
        {...props}
      >
        {children}
      </FloatingActionButtonComponent>
    );
  }
}

FloatingActionButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node,
  use: PropTypes.string,
  mini: PropTypes.bool
};

FloatingActionButton.defaultProps = {
  children: null,
  className: '',
  component: 'button',
  use: 'primary',
  mini: false
};
