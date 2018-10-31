import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fa } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas);

const defaultClassName = css``;

export default class Icon extends Component {
  displayName = 'Icon';
  render() {
    const {
      children,
      className,
      component: IconComponent,
      icon,
      ...props
    } = this.props;

    return <FontAwesomeIcon icon={icon} {...props} />;
  }
}

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node,
  icon: PropTypes.string.isRequired
};

Icon.defaultProps = {
  children: null,
  className: '',
  component: 'i'
};
