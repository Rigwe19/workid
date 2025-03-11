import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import loadingAnimation from './loader.json'; // You'll need to add your Lottie JSON file

interface LoaderProps {
    size?: number;
}

const Loader = ({ size = 400 }: LoaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center absolute inset-0 bg-black/50"
        >
            <DotLottieReact
                loop
                src='/loader.lottie'
                autoplay
                style={{ width: size, height: size }}
            />
        </motion.div>
    );
};

export default Loader;