/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import colors from '../../theme/colors';

const defaultCSS = ({ use }) => css`
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

const defaultWithSignifierIconCSS = css`
  padding-left: 48px;
`;
const defaultWithActionIconCSS = css`
  padding-right: 48px;
`;
const labelCSS = ({ use }) => css`
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

const labelWithSignifierIconCSS = css`
  left: 48px;
`;

const helperTextCSS = ({ use }) => css`
  color: ${use === 'danger' ? colors[use] : 'grey'};
  line-height: 14px;
  font-size: 14px;
  margin: 6px 18px;
`;
const signifierIconCSS = ({ use }) => css`
  position: absolute;
  top: 20px;
  left: 18px;
  height: 36px;
  color: ${use === 'danger' ? colors[use] : 'grey'};
`;
const actionIconCSS = ({ use }) => css`
  position: absolute;
  top: 20px;
  right: 18px;
  height: 36px;
  color: ${use === 'danger' ? colors[use] : 'grey'};
`;
const containerCSS = css`
  position: relative;
`;

const Input = ({
  children,
  className,
  component: InputComponent,
  use,
  label,
  helperText,
  signifierIcon,
  actionIcon,
  ...props
}) => {
  const inputEl = useRef(null);

  const onLabelClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  return (
    <div css={containerCSS}>
      <div className="fp-icon" css={signifierIconCSS({ use })}>
        {signifierIcon}
      </div>
      <InputComponent
        css={[
          defaultCSS({ use }),
          !!signifierIcon && [`${defaultWithSignifierIconCSS}`],
          !!actionIcon && [`${defaultWithActionIconCSS}`]
        ]}
        ref={inputEl}
        placeholder=" "
        {...props}
      />
      <label
        css={[
          labelCSS({ use }),
          !!signifierIcon && [`${labelWithSignifierIconCSS}`]
        ]}
        htmlFor={props.id}
        onClick={onLabelClick}
      >
        {label}
      </label>
      <div className="fp-icon" css={actionIconCSS({ use })}>
        {actionIcon}
      </div>
      <div css={helperTextCSS({ use })}>{helperText}</div>
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.node,
  type: PropTypes.oneOf(['filled', 'outlined']),
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool, // ??
  hasError: PropTypes.bool,
  signifierIcon: PropTypes.node,
  actionIcon: PropTypes.node,
  use: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

Input.defaultProps = {
  children: null,
  className: '',
  component: 'input',
  type: 'outlined',
  use: 'primary'
};

Input.displayName = 'Input';

export default Input;
