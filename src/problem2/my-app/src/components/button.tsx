import React, { ReactElement } from 'react';

type ReactText = string | number;

interface ButtonProps {
  onClick: () => void;
  children: ReactElement | ReactText | React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
