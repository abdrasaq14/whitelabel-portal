"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface SideNavItem {
  label: string;
  href: string;
  icon: any;
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
    <div className={`side-nav ${isOpen ? 'w-80' : 'w-20'} border-e border-r-purple-main px-5 bg-white text-accent-dark3 font-satoshiRegular text-sm h-full fixed transition-width duration-300`}>
      <div className='flex justify-between items-center w-full mt-5'>
        <Image src="/images/landmark_logo.svg" alt="Landmark logo" width={164} height={64} />
        <button onClick={toggleNav}>{isOpen ? <MdKeyboardDoubleArrowLeft className="text-2xl font-satoshiRegular" /> : <MdKeyboardDoubleArrowRight className="text-2xl font-satoshiRegular" />}</button>
      </div>
      <ul className="mt-10 space-y-5">
        {items.map((item) => (
          <li
            key={item.label}
            className={`hover:bg-purple-main hover:text-white flex items-center p-2 space-x-2 rounded-md group hover:cursor-pointer`}
          >
            <Link href={item.href} className="flex items-center space-x-2 text-white">
              <item.icon className="text-lg icon transition-all" />
              {isOpen && <span className='text-accent-dark3 group-hover:text-white'>{item.label}</span>}
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
