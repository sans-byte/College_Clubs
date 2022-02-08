import React, { Children } from 'react';

function Button({children, isDisabled, version, type}) {
  return <button type={type} className="btn btn-primary">
      {children}
  </button>;
}

export default Button;
