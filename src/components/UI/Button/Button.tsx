import React from 'react';
import './Button.scss'

interface Props {
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick: () => void;
    children: string | React.ReactNode;
    className?: string
}

const Button:React.FC<Props> = ({ type = 'button', onClick, children, className }) => (
    <button
        className={`button ${className}`}
        type={type}
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button