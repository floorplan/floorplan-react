import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import colors from '../../theme/colors';

const defaultClassName = use => css`
  padding: 18px;
  border-radius: 3px;
  border: 1px solid ${use === 'danger' ? colors[use] : 'grey'};
  font-size: 18px;
  line-height: 18px;
  min-width: 238px;
  cursor: pointer;

  &:focus,
  &:active {
    border: 2px solid ${colors[use]};
    outline: none;

    & + label {
      color: ${colors[use]};
      line-height: 14px;
      font-size: 14px;
      background-color: white;
      bottom: inherit;
      top: -5px;

      & + .fp-icon {
        color: ${colors[use]};
      }
    }
  }

  &:not(:placeholder-shown) {
    & + label {
      color: ${colors[use]};
      line-height: 14px;
      font-size: 14px;
      background-color: white;
      bottom: inherit;
      top: -5px;
    }
  }
`;

const defaultWithSignifierIconClassName = css`
  padding-left: 48px;
`;
const defaultWithActionIconClassName = css`
  padding-right: 48px;
`;
const labelClassName = use => css`
  padding: 0px 6px;
  color: grey;
  position: absolute;
  top: 2px;
  bottom: 2px;
  line-height: 55px;
  font-size: 18px;
  left: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in;
`;

const labelWithSignifierIconClassName = css`
  left: 48px;
`;

const helperTextClassName = use => css`
  color: ${use === 'danger' ? colors[use] : 'grey'};
  line-height: 14px;
  font-size: 14px;
  margin: 6px 18px;
`;
const signifierIconClassName = use => css`
  position: absolute;
  top: 20px;
  left: 18px;
  height: 36px;
  color: ${use === 'danger' ? colors[use] : 'grey'};
`;
const actionIconClassName = use => css`
  position: absolute;
  top: 20px;
  right: 18px;
  height: 36px;
  color: ${use === 'danger' ? colors[use] : 'grey'};
`;
const containerClassName = css`
  position: relative;
`;

export default class Input extends Component {
  displayName = 'Input';
  render() {
    const {
      children,
      className,
      component: InputComponent,
      use,
      label,
      helperText,
      signifierIcon,
      actionIcon,
      ...props
    } = this.props;

    return (
      <div class={containerClassName}>
        <div class={cx('fp-icon', signifierIconClassName(use))}>
          {signifierIcon}
        </div>
        <InputComponent
          className={cx(className, defaultClassName(use), {
            [`${defaultWithSignifierIconClassName}`]: !!signifierIcon,
            [`${defaultWithActionIconClassName}`]: !!actionIcon
          })}
          placeholder=" "
          ref={input => (this.input = input)}
          {...props}
        />
        <label
          class={cx(labelClassName(use), {
            [`${labelWithSignifierIconClassName}`]: !!signifierIcon
          })}
          onClick={() => this.input.focus()}
        >
          {label}
        </label>
        <div class={cx('fp-icon', actionIconClassName(use))}>{actionIcon}</div>
        <div class={helperTextClassName(use)}>{helperText}</div>
      </div>
    );
  }
}

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node,
  type: PropTypes.oneOf('filled', 'outlined'),
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool, // ??
  hasError: PropTypes.bool,
  signifierIcon: PropTypes.node,
  actionIcon: PropTypes.node,
  use: PropTypes.oneOf('primary', 'secondary', 'danger')
};

Input.defaultProps = {
  children: null,
  className: '',
  component: 'input',
  type: 'outlined',
  use: 'primary'
};
