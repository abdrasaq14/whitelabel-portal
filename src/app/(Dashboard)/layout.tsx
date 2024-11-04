"use client"
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import DashboardSidenav from "@/components/layouts/DashboardSidenav";
import { ReactNode } from 'react';
import { FiHome, FiSettings } from 'react-icons/fi';

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
        <div className="flex">
            <DashboardSidenav items={navItems} onLogout={onLogout} />
            <div className="flex flex-col flex-grow ml-20 lg:ml-80">
                <DashboardNavbar username={username} />
                <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
            </div>
        </div>
    )
};
