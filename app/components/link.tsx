import { Link as RouterLink } from 'react-router';
import type { FC } from 'react';
import clsx from 'clsx'; // You'll need to install clsx for conditional classes

interface CustomLinkProps {
    to: string;
    variant?: 'primary' | 'outline';
    children: React.ReactNode;
    className?: string;
}

const Link: FC<CustomLinkProps> = ({ to, variant = 'primary', children, className }) => {
    return (
        <RouterLink
            viewTransition
            to={to}
            className={clsx(
                'inline-block px-6 py-2 rounded transition-all duration-300 no-underline',
                {
                    'bg-[#0764ea] text-white hover:bg-[#0056b3]': variant === 'primary',
                    'border border-[#0764ea] text-[#0764ea] hover:bg-[#007bff1a]': variant === 'outline'
                },
                className
            )}
        >
            {children}
        </RouterLink>
    );
};

export default Link;
