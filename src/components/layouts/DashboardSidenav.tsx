"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SideNavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SideNavProps {
  items: SideNavItem[];
  onLogout: () => void;
}

const DashboardSidenav: React.FC<SideNavProps> = ({ items, onLogout }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className={`side-nav ${isOpen ? 'w-72' : 'w-20'} pl-5 bg-white text-accent-dark3 font-satoshiRegular text-sm h-full fixed transition-width duration-300`}>
      <div className='flex justify-between items-center w-full mt-5'>
        <Image src="/images/landmark_logo.svg" alt="Landmark logo" width={164} height={64} />
        <button onClick={toggleNav} className="p-2 m-2 text-sm font-satoshiRegular">hello</button>
      </div>
      <ul className="mt-10 space-y-2">
        {items.map((item) => (
          <li key={item.label} className={router.pathname === item.href ? 'bg-gray-700' : ''}>
            <Link href={item.href} className="flex items-center p-2 space-x-2 hover:bg-gray-700 rounded-md">
              <item.icon className="text-sm font-satoshiRegular" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={onLogout} className="absolute bottom-0 p-2 space-x-2 w-full flex items-center hover:bg-gray-700">
        <FiLogOut className="text-xl" />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default DashboardSidenav;
