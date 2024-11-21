import { FiBell, FiUser } from 'react-icons/fi';
import Notification from '../icons/Notification';
import { NavBarProps } from '@/interfaces/ComponentInterfaces';

const DashboardNavbar: React.FC<NavBarProps> = ({ businessName }) => {
  
  return (
    
    <nav className="navbar bg-white shadow-md px-4 py-6 flex justify-between items-center">
      
      <div className="flex flex-col">

        <span className='font-SatoshiRegular text-base text-accent-dark3'>Welcome back,</span>

        <span className='font-SatoshiRegular text-base text-accent-dark3'>Hi, {businessName}</span>

      </div>

      <div className="relative inline-block transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
      
        <div className='h-12 w-12 bg-primary hover:cursor-pointer rounded-full flex justify-center items-center hover:bg-primary-dark'>

          <Notification />

        </div>

        <span className='animate-bounce-5 absolute top-2 right-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-satoshiRegular'>0</span>
      
      </div>
    
    </nav>
  
  );

};

export default DashboardNavbar;
