"use client";
import Link from 'next/link';
import Image from 'next/image';
// import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SideNavItemChild, SideNavProps } from '@/interfaces/ComponentInterfaces';
import useNavs from '@/customHooks/useNavs';
import LogoutIcon from '../icons/LogoutIcon';
import DownArrowIcon from '../icons/DownArrowIcon';
import LogoutModal from '../modals/LogoutModal';
import useModal from '@/customHooks/useModal';
import { openLogoutModal, closeLogoutModal } from '@/store/slices/modalSlice';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const DashboardSidenav = ({ items }: SideNavProps) => {
  
  const { isOpen, logout, currentUser } = useNavs();

  const {handleOpenModal, handleCloseModal, showLogoutModal} = useModal();

  const pathname = usePathname();

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleExpand = (label: string) => {
    
    setExpandedItem(expandedItem === label ? null : label); // Toggle the expanded state
  
  };

  // console.log(pathname)

  // const {conversations} = useMessage();

  // console.log("Sidenav conversations", conversations)

  return (
    <div className={`side-nav ${isOpen ? 'w-80' : 'w-20'} overflow-auto border-e-[0.4px] border-r-purple-main px-5 bg-white text-accent-dark3 font-satoshiRegular text-sm h-full fixed transition-width duration-300`}>
      
      <div className='flex justify-between items-center w-full mt-5'>
        
        <Image src={currentUser?.user?.companyLogo} alt={`${currentUser?.user?.buinessName} logo`} width={0} height={0} className="max-h-14 w-auto" sizes="100vw" />
        
        {/* <button onClick={toggleNav}>
        
          {isOpen ? <MdKeyboardDoubleArrowLeft className="text-2xl font-satoshiRegular" /> : <MdKeyboardDoubleArrowRight className="text-2xl font-satoshiRegular" />}
        
        </button> */}
      
      </div>

      <ul className="mt-10 space-y-5">
      
        {items.map((item) => (
      
          <li key={item.label}> {/* Add key here for each item */}
      
            <Link href={item.href}>
          
              <div className={`${pathname === `/${item.label}` ? 'bg-purple-main text-white' : 'hover:bg-purple-lighter hover:text-white'} flex items-center justify-between p-2 space-x-2 rounded-md group hover:cursor-pointer mt-3`}
                onClick={() => handleExpand(item.label)}
              >
                
                <div className="flex items-center space-x-2 text-white">
                
                  <item.icon className="text-lg icon transition-all" />
                
                  {isOpen && <span className={`text-accent-dark3 ${pathname === `/${item.label}` ? 'text-white' : 'group-hover:text-purple-main'}`}>{item.label}</span>}
                
                  {/* {item?.counter !== undefined && item?.counter > 0 && <span className={`w-[20px] h-[20px] flex justify-center items-center rounded-lg text-xs font-satoshiBold ml-2 ${activeLabel === item.label ? `bg-white text-accent-dark3` : `bg-accent-light`}`}>
                    {item?.counter}
                  </span>} */}
                
                </div>
                
                {item.children && <DownArrowIcon />}
              
              </div>
            
            </Link>
            
            {item.children && expandedItem === item.label && (
            
              <div className={`pl-8 pt-2 flex flex-col gap-3 text-sm`} style={{ marginTop: 0 }}>
            
                {item.children.map((child: SideNavItemChild) => (
              
                  <Link key={child.label} href={child.href}> {/* Add key here for each child */}
                  
                    <span className={`text-accent-dark3 hover:text-purple-main`}>{child.label}</span>
                  
                  </Link>
                
                ))}
              
              </div>
            
            )}
          
          </li>
        
        ))}
      
      </ul>

      <div onClick={() => handleOpenModal(openLogoutModal)} className='rounded flex justify-between items-center p-3 w-full border border-purple-main my-10 hover:bg-purple-lighter hover:cursor-pointer'>
      
        <div>
      
        <Image src={currentUser?.user?.companyLogo} alt={`${currentUser?.user?.buinessName} logo`} width={0} height={0} className="max-h-14 w-auto" sizes="100vw" />
      
          <p className="text-accent-dark3 text-sm font-satoshiRegular">{currentUser?.user?.email}</p>
      
        </div>
      
        <LogoutIcon />
      
      </div>

      <LogoutModal logout={logout} handleCloseModal={() => handleCloseModal(closeLogoutModal)} showLogoutModal={showLogoutModal} />
    
    </div>
  
  );

};

export default DashboardSidenav;
