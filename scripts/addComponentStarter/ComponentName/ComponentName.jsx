import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ComponentName extends Component {
  render() {
    const {
      children,
      className,
      style,
      ...props,
    } = this.props;

    return <div
      className={className}
      style={style}
      {...props}
    >
      ComponentName
      <br />
      {children}
    </div>;
  }
}

ComponentName.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

ComponentName.defaultProps = {
  children: null,
  className: '',
  style: {},
};
