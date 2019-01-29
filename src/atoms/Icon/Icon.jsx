import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fa } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas);

const Icon = ({ icon, ...props }) => <FontAwesomeIcon icon={icon} {...props} />;

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

Icon.defaultProps = {
  component: 'i'
};

Icon.displayName = 'Icon';

export default Icon;
