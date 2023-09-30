import React from 'react';

interface ContentWrapperProps {
  children?: JSX.Element | Array<JSX.Element>;
  className?: string;
}

export default function ContentWrapper({ children, className }: ContentWrapperProps) {
  return (
    <div className={`relative px-4 ${className}`}>
      {children}
    </div>
  );
}
