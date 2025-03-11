import { motion } from "framer-motion";
import { useState } from "react";
import { HiCog, HiDocument, HiHome, HiUsers } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { Navigate, NavLink, Outlet } from "react-router";
import useAuth from '~/stores/authStore'

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const { token } = useAuth()

    if(!token) return <Navigate to="/onboarding/login" />

    const menuItems = [
        { icon: <HiHome size={isOpen?24:28} />, title: "Home", href: "/" },
        // { icon: <HiUsers size={isOpen?24:28} />, title: "Users", href: "/" },
        // { icon: <HiDocument size={isOpen?24:28} />, title: "Documents", href: "/" },
        { icon: <HiCog size={isOpen?24:28} />, title: "Settings", href: "/settings" },
    ];

    const Sidebar = () => (
        <motion.div
            className="fixed left-0 top-0 h-screen bg-gray-800 text-white"
            animate={{ width: isOpen ? "240px" : "70px" }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="p-4">
                <motion.h2
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    className="text-xl font-bold"
                >
                    Dashboard
                </motion.h2>
            </div>
            <nav className="mt-8">
                {menuItems.map((item, index) => (
                    <NavLink
                        viewTransition
                        key={item.href}
                        to={item.href}
                        className={({ isActive, isPending }) =>
                            isPending ? "flex items-center px-4 py-3 " : isActive ? "flex items-center px-4 py-3 bg-primary" : "flex items-center px-4 py-3 hover:bg-gray-700"
                          }
                    >
                        {item.icon}
                        <motion.span
                            animate={{ display: isOpen ? 'block' : 'none', marginLeft: isOpen ? "12px" : 0 }}
                            className="whitespace-nowrap"
                        >
                            {item.title}
                        </motion.span>
                    </NavLink>
                ))}
            </nav>
        </motion.div>
    );

    const BottomNav = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
            <div className="grid grid-cols-4 py-1 relative">
            {/* Sliding background */}
            {menuItems.map((item, index) => (
                <NavLink
                viewTransition key={item.href} to={item.href} 
                className={({ isActive, isPending }) => {
                    const baseClass = "text-center flex flex-col justify-center items-center py-2 relative z-10";
                    if (isPending) return baseClass;
                    if (isActive) {
                    return `${baseClass} text-white`;
                    }
                    return baseClass;
                }}
                >
                {({ isActive }) => (
                    <>
                    {isActive && (
                        <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-primary rounded-full -z-[1]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    {item.icon}
                    <span className="text-white text-sm">{item.title}</span>
                    </>
                )}
                </NavLink>
            ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <motion.header animate={{
                marginLeft: isMobile ? 0 : isOpen ? '240px' : '60px'
            }} className="bg-white shadow-sm">
                <div className="px-4 py-3 flex justify-between items-center">
                    {/* <h1 className="text-xl font-semibold">Admin Dashboard</h1> */}
                    <img
                        className='w-16'
                        src="/frontlett.png"
                    />
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <HiUsers size={20} />
                        </button>
                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <motion.main animate={{
                marginLeft: isMobile ? 0 : isOpen ? '240px' : '70px'
            }} className={`p-6 ${!isMobile ? "ml-[70px]" : "mb-16"}`}>
                <Outlet />
            </motion.main>

            {/* Navigation */}
            {isMobile ? <BottomNav /> : <Sidebar />}
        </div>
    );
}