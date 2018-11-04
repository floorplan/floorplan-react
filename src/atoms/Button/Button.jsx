import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import colors from '../../theme/colors';

const defaultClassName = use => css`
  padding: 9px 15px;
  color: ${colors[use]};
  text-transform: uppercase;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors[`${use}Light`]};
    color: ${colors[`${use}Text`]};
  }
`;

const outlinedClassName = use => css`
  border: 2px solid ${colors[use]};
  color: ${colors[use]};

  &:hover {
    background-color: ${colors[use]};
    color: ${colors[`${use}Text`]};
  }
`;

const containedClassName = use => css`
  background-color: ${colors[use]};
  color: ${colors[`${use}Text`]};

  &:hover {
    background-color: ${colors[use]};
    color: ${colors[`${use}Text`]};
  }
`;

export default class Button extends Component {
  displayName = 'Button';
  render() {
    const {
      children,
      className,
      component: ButtonComponent,
      type,
      use,
      ...props
    } = this.props;

    return (
      <ButtonComponent
        className={cx(className, defaultClassName(use), {
          [`${outlinedClassName(use)}`]: type === 'outlined',
          [`${containedClassName(use)}`]: type === 'contained'
        })}
        {...props}
      >
        {children}
      </ButtonComponent>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node,
  type: PropTypes.oneOf(['text', 'outlined', 'contained']),
  use: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

Button.defaultProps = {
  children: null,
  className: '',
  component: 'button',
  type: 'text',
  use: 'primary'
};
