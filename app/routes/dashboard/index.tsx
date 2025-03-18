import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { HiCog, HiHome, HiSearch, HiUsers } from "react-icons/hi";
import { useMediaQuery, useClickAway } from "@uidotdev/usehooks";
import { Navigate, NavLink, Outlet } from "react-router";
import useAuth from '~/stores/authStore';
import clsx from "clsx";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");
    const { token, logout, user } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useClickAway<any>(() => setDropdownOpen(false))
    useEffect(() => {
        console.log(isOpen, isMobile)
    }, [isOpen, isMobile, dropdownOpen]);

    const adminNav = user?.role !== 'employee' ? [
        { icon: <HiSearch size={isOpen ? 24 : 28} />, title: "Users", href: "/search", role: 'employer' }
    ]: []
    const menuItems = [
        { icon: <HiHome size={isOpen ? 24 : 28} />, title: "Home", href: "/" },
        ...adminNav,
        // { icon: <HiDocument size={isOpen?24:28} />, title: "Documents", href: "/" },
        { icon: <HiCog size={isOpen ? 24 : 28} />, title: "Settings", href: "/settings" },
    ];

    const Sidebar = useMemo(() => {
        const SidebarComponent = () => (
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
                <nav className="mt-8 flex flex-col gap-2">
                    {menuItems.map((item, index) => (
                        <NavLink
                            viewTransition
                            key={item.href}
                            to={item.href}
                            className={({ isActive, isPending }) => {
                                const baseClass = `flex items-center ${isOpen?'justify-start':'justify-center'} hover:bg-blue-700 px-4 py-3 relative`
                                if(isPending) return baseClass
                                if(isActive) return clsx('hover:bg-blue-400', baseClass, )
                                return baseClass
                            }
                                // isPending ? "flex items-center justify-center px-4 py-3 relative" : isActive ? "flex items-center px-4 py-3 relative" : "flex items-center px-4 py-3"
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeBackground"
                                            className="absolute inset-0 bg-primary -z-[1]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.1 }}
                                        />
                                    )}
                                    {item.icon}
                                    <motion.span
                                        animate={{ display: isOpen ? 'block' : 'none', marginLeft: isOpen ? "12px" : 0 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.title}
                                    </motion.span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </motion.div>
        );
        return SidebarComponent;
    }, [isOpen]);

    const BottomNav = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
            <div className="grid auto-cols-fr grid-flow-col py-1 relative">
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
    if (!token) return <Navigate to="/onboarding/get-started" />

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
                        <div ref={ref} className="relative">
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="w-8 h-8 bg-gray-300 rounded-full"
                            />
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                                    >
                                        <button
                                            onClick={logout}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
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