import React from 'react';
import { Link } from 'react-router';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    children: React.ReactNode;
    href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'medium',
            isLoading = false,
            children,
            className = '',
            disabled,
            href,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'rounded-md cursor-pointer font-medium transition-colors focus:outline-none';
        
        const variants = {
            primary: 'bg-primary text-white hover:bg-blue-700 active:bg-primary',
            secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-blue-200',
            outline: 'border-2 border-primary text-primary hover:bg-blue-50 active:bg-blue-100'
        };

        const sizes = {
            small: 'px-5 py-1.5 text-sm',
            medium: 'px-7 py-2 text-base',
            large: 'px-10 py-3 text-lg'
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </span>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';