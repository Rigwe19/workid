import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface LoaderProps {
    show: boolean;
}

const Loader = ({ show }: LoaderProps) => {
    const location = useLocation();
    const isOnboarding = location.pathname.includes('onboarding');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (show) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'unset'
            }
        }
    }, [show]);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.05 }}
            className={`items-center justify-center absolute z-[9999] inset-0 ${isOnboarding ? 'pointer-events-auto' : 'pointer-events-none'} bg-black/50 ${show ? 'flex' : 'hidden'}`}
        >
            <span className="loader"></span>
        </motion.div>
    );
};

export default Loader;