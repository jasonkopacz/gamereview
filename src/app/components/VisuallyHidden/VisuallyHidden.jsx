import React from 'react';

function VisuallyHidden({
  as: Element = 'span',
  className,
  children,
  ...delegated
}) {
  return (
    <Element
      className={className}
      {...delegated}
    >
      {children}
    </Element>
  );
}

export default VisuallyHidden;