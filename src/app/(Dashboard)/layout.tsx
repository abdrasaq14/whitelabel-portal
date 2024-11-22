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
import { DashboardLayoutProps, SideNavItem } from "@/interfaces/ComponentInterfaces";
import { closeNotificationModal, openNotificationModal, openLogoutModal, closeLogoutModal } from '@/store/slices/modalSlice';
import useStorage from "@/customHooks/useStorage";
import useNavs from "@/customHooks/useNavs";
import useModal from "@/customHooks/useModal";

const navItems: SideNavItem[] = [
    { label: 'Dashboard', href: '/Dashboard', icon: DashboardIcon },
    { label: 'Products Discovery', href: '#', icon: CompassIcon, children: [{label: 'Discover Products', href: '/DiscoverProducts'}, {label: 'Discover Merchant', href: '/DiscoverMerchant'}] },
    { label: 'Category', href: '/Category', icon: CategoryIcon },
    { label: 'Inventory', href: '/Inventory', icon: InventoryIcon },
    { label: 'Merchant', href: 'merchant/all', icon: MerchantIcon, children: [{label: 'All Merchants', href: '/merchant/all'}, {label: 'Suspended Merchants', href: '/merchant/suspended'}, {label: 'Merchant Request', href: '/merchant/request'}] },
    { label: 'Product', href: 'product/all', icon: ProductIcon, children: [{label: 'All Products', href: '/product/all'}, {label: 'Blocked Product', href: '/product/blocked'}, {label: 'Product Request', href: '/product/request'}] },
    { label: 'Order & Transaction', href: '/Order', icon: OrderIcon },
    { label: 'Blog', href: '/blog', icon: BlogIcon },
    { label: 'Message', href: '/Message', icon: MessageIcon },
    { label: 'Account', href: '/Account', icon: AccountIcon },
    { label: 'Settings', href: '/Settings', icon: SettingsIcon },
];

export default function DashboardLayout({ children}: DashboardLayoutProps) {

    const {currentUser} = useStorage();

    const { isOpen, logout, newNotifications, viewNotification } = useNavs();

    // console.log("New notifications", newNotifications);

    const {handleOpenModal, handleCloseModal, showLogoutModal, showNotificationModal} = useModal();

    return (
    
        <div className="flex bg-accent-light">
        
            <DashboardSidenav items={navItems} isOpen={isOpen} logout={logout} showLogoutModal={showLogoutModal} currentUser={currentUser} handleOpenModal={() => handleOpenModal(openLogoutModal)} handleCloseModal={() => handleCloseModal(closeLogoutModal)} />
        
            <div className="flex flex-col flex-1 ml-20 lg:ml-80">
        
                <DashboardNavbar viewNotification={(notificationId: string) => viewNotification(notificationId)} businessName={currentUser?.user?.buinessName} handleOpenModal={() => handleOpenModal(openNotificationModal)} handleCloseModal={() => handleCloseModal(closeNotificationModal)} showNotificationModal={showNotificationModal} newNotifications={newNotifications} />
        
                <main className="p-4 bg-gray-100 min-h-screen overflow-y-auto">{children}</main>
        
            </div>
        
        </div>
    
    )

};
