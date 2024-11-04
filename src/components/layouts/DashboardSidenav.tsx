"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SideNavProps } from '@/interfaces/ComponentInterfaces';
import useNavs from '@/customHooks/useNavs';
import LogoutIcon from '../icons/LogoutIcon';
import LogoutModal from '../modals/LogoutModal';

const DashboardSidenav: React.FC<SideNavProps> = ({ items }) => {
  const {isOpen, toggleNav, logout, handleOpenLogoutModal} = useNavs();

  return (
    <div className={`side-nav ${isOpen ? 'w-80' : 'w-20'} overflow-auto border-e-[0.4px] border-r-purple-main px-5 bg-white text-accent-dark3 font-satoshiRegular text-sm h-full fixed transition-width duration-300`}>
      
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

      <div onClick={handleOpenLogoutModal} className='rounded flex justify-between items-center p-3 w-full border border-purple-main my-10 hover:bg-purple-lighter hover:cursor-pointer'>
        <div>
          <Image src="/images/landmark_logo.svg" alt="Landmark logo" width={164} height={64} />
          <p className="text-accent-dark3 text-sm font-satoshiRegular">landmarkuniversity@gmail.com</p>
        </div>
        <LogoutIcon />
      </div>

      <LogoutModal />
    
    </div>
  );
};

export default DashboardSidenav;
