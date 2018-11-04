import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import colors from '../../theme/colors';

const defaultClassName = use => css`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 36px;
  background-color: ${colors[use]};
  color: ${colors[`${use}Text`]};
  display: flex;
  padding: 12px;
`;

export default class AppBarBottom extends Component {
  displayName = 'AppBarBottom';
  render() {
    const {
      children,
      className,
      component: AppBarBottomComponent,
      use,
      ...props
    } = this.props;

    return (
      <AppBarBottomComponent
        className={cx(className, defaultClassName(use))}
        {...props}
      >
        {children}
      </AppBarBottomComponent>
    );
  }
}

AppBarBottom.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node,
  use: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

AppBarBottom.defaultProps = {
  children: null,
  className: '',
  component: 'nav',
  use: 'primary'
};
