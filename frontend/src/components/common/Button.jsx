import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components.css';

/**
 * A reusable button component.
 * @param {node} children - The content of the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} type - The button type (e.g., 'button', 'submit').
 * @param {boolean} disabled - Whether the button should be disabled.
 * @param {string} className - Additional CSS classes.
 */
const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;