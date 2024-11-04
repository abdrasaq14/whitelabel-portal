"use client"
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import DashboardSidenav from "@/components/layouts/DashboardSidenav";
import { ReactNode } from 'react';
import { FiHome, FiSettings } from 'react-icons/fi';
import { RxDashboard } from "react-icons/rx";
import { CiCompass1 } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import DashboardIcon from "@/components/icons/DashboardIcon";
import CompassIcon from "@/components/icons/CompassIcon";
import AccountIcon from "@/components/icons/AccountIcon";
import BlogIcon from "@/components/icons/BlogIcon";
import CategoryIcon from "@/components/icons/CategoryIcon";
import InventoryIcon from "@/components/icons/InventoryIcon";
import MerchantIcon from "@/components/icons/MerchantIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import OrderIcon from "@/components/icons/OrderIcon";
import ProductIcon from "@/components/icons/ProductIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";

interface DashboardLayoutProps {
    children: ReactNode;
    username: string;
    onLogout: () => void;
  }

const navItems = [
    { label: 'Dashboard', href: '/Dashboard', icon: DashboardIcon },
    { label: 'Products Discovery', href: '/ProductsDiscovery', icon: CompassIcon },
    { label: 'Category', href: '/Category', icon: CategoryIcon },
    { label: 'Inventory', href: '/Inventory', icon: InventoryIcon },
    { label: 'Merchant', href: '/Merchant', icon: MerchantIcon },
    { label: 'Product', href: '/Product', icon: ProductIcon },
    { label: 'Order & Transaction', href: '/Order', icon: OrderIcon },
    { label: 'Blog', href: '/Blog', icon: BlogIcon },
    { label: 'Message', href: '/Message', icon: MessageIcon },
    { label: 'Account', href: '/Account', icon: AccountIcon },
    { label: 'Settings', href: '/Settings', icon: SettingsIcon },
  ];

export default function DashboardLayout({ children, username, onLogout }: DashboardLayoutProps) {
    return (
        <div className="flex bg-accent-light">
            <DashboardSidenav items={navItems} onLogout={onLogout} />
            <div className="flex flex-col flex-1 ml-20 lg:ml-80">
                <DashboardNavbar username={username} />
                <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
            </div>
        </div>
    )
};
