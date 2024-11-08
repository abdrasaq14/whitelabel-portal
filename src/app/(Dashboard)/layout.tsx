"use client"
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import DashboardSidenav from "@/components/layouts/DashboardSidenav";
import { ReactNode } from 'react';
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
import { SideNavItem } from "@/interfaces/ComponentInterfaces";

interface DashboardLayoutProps {
    children: ReactNode;
    username: string;
  }

const navItems: SideNavItem[] = [
    { label: 'Dashboard', href: '/Dashboard', icon: DashboardIcon },
    { label: 'Products Discovery', href: '/DiscoverProducts', icon: CompassIcon, children: [{label: 'Discover Products', href: '/DiscoverProducts'}, {label: 'Discover Merchant', href: '/DiscoverMerchant'}] },
    { label: 'Category', href: '/Category', icon: CategoryIcon },
    { label: 'Inventory', href: '/Inventory', icon: InventoryIcon },
    { label: 'Merchant', href: '/Merchant', icon: MerchantIcon, children: [{label: 'Merchant Request', href: '/MerchantRequest'}] },
    { label: 'Product', href: '/Product', icon: ProductIcon },
    { label: 'Order & Transaction', href: '/Order', icon: OrderIcon },
    { label: 'Blog', href: '/Blog', icon: BlogIcon },
    { label: 'Message', href: '/Message', icon: MessageIcon },
    { label: 'Account', href: '/Account', icon: AccountIcon },
    { label: 'Settings', href: '/Settings', icon: SettingsIcon },
  ];

export default function DashboardLayout({ children, username}: DashboardLayoutProps) {
    return (
        <div className="flex bg-accent-light">
            <DashboardSidenav items={navItems} />
            <div className="flex flex-col flex-1 ml-20 lg:ml-80">
                <DashboardNavbar username={username} />
                <main className="p-4 bg-gray-100 min-h-screen overflow-y-auto">{children}</main>
            </div>
        </div>
    )
};
