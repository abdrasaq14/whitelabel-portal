import { FiBell, FiUser } from 'react-icons/fi';

interface NavBarProps {
  username: string;
}

const DashboardNavbar: React.FC<NavBarProps> = ({ username }) => {
  return (
    <nav className="navbar bg-white shadow-md px-4 py-6 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl cursor-pointer" />
        <div className="flex items-center space-x-2">
          <FiUser className="text-xl" />
          <span className="font-semibold">{username}</span>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
