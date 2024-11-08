"use client"
import { ReactNode } from 'react';
import { FiHome, FiSettings } from 'react-icons/fi';
import Image from "next/image";

interface DashboardLayoutProps {
    children: ReactNode;
    username: string;
    onLogout: () => void;
  }

const navItems = [
    { label: 'Home', href: '/home', icon: FiHome },
    { label: 'Settings', href: '/settings', icon: FiSettings },
  ];

export default function DashboardLayout({ children, username, onLogout }: DashboardLayoutProps) {
    return (
        <div className="h-screen w-full sm:bg-purple-lighter ">
            <div className="w-full hidden sm:flex justify-center items-center bg-white p-2  shadow h-[64px] border-b-[1px] border-purple-main ">
                <Image alt='profitAll Logo' src='/images/logo-purple.svg' width={100} height={18} priority/>
            </div>
            <div className="logo-position w-full p-4 flex sm:hidden items-center justify-center">
            <Image alt='profitAll Logo' src='/images/logo-purple.svg' width={100} height={18} priority />
            </div>    
            {children} 
        </div> 
    )
};
