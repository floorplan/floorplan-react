import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from 'emotion';

const defaultClassName = css`
  padding: 6px;
  margin: 6px;
  color: hotpink;
  box-shadow: 0 2px 6px 1px rgba(100, 100, 100, 0.4);
  border-radius: 3px;
`;

export default class ComponentName extends Component {
  displayName = 'ComponentName';
  render() {
    const {
      children,
      className,
      component: ComponentNameComponent,
      ...props
    } = this.props;

    return (
      <ComponentNameComponent
        className={classnames(className, defaultClassName)}
        {...props}
      >
        ComponentName
        <br />
        {children}
      </ComponentNameComponent>
    );
  }
}

ComponentName.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node
};

ComponentName.defaultProps = {
  children: null,
  className: '',
  component: 'div'
};
