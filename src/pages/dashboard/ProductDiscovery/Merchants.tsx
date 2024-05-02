import React,{useState} from 'react'
import StarRating from '../../../components/Rating.tsx/index'
import { Table } from '../../../components/Table/Table2';
import { ViewAddMerchantModal } from '../../../components/Modal/MerchantModal';
interface Pagination {
    page: number;
    pageSize: number;
    totalRows: number;
}

interface StoreData {
    serialNumber: number;
    storeName: string;
    status: string;
    rating: number;
    avatar_url: string;
    category: string;
    dateJoined: string;
    storeLink: string;
    storeAddress: string;
    categories: string[]; 
    location: string;
}

interface MockData {
    data: StoreData[];
    pagination: Pagination;
}
const mockData: MockData = {
    data :[
        
        {  serialNumber: 1,
            storeName: "Ese-store",
            status: "Active",
            avatar_url: "/images/avatar.svg",
            dateJoined: "Friday, Jan 26, 2022",
            storeLink: "https://www.ese-store.com",
            storeAddress: "No 2, Opebi Road, Ikeja, Lagos",
            category: "Electronics",
            rating:3, 
            categories:["Gaming", "Hardware", "Software"],
            location: "Lagos Nigeria"
        },
        {
            serialNumber: 2,
            storeName: "Tech Haven",
            status: "Active",
            avatar_url: "/images/avatar.svg",
            storeLink: "https://www.tech-haven.com",
            dateJoined: "Monday, Jul 26, 2023",
            storeAddress: "No 4, Opebi Road, Ikeja, Lagos",
            category: "Electronics",
            rating: 4,
            categories: ["Electronics", "Accessories", "Gadgets"],
            location: "Abuja Nigeria"
        },
        {
            serialNumber: 3,
            storeName: "Gamer's Paradise",
            status: "Suspended",
            avatar_url: "/images/avatar.svg",
            dateJoined: "Wednesday, Mar 26, 2024",
            storeLink: "https://www.gamers-paradise.com",
            storeAddress: "No 6, Opebi Road, Ikeja, Lagos",
            category: "Gaming",
            rating: 4.5,
            categories: ["Gaming", "Consoles", "Accessories"],
            location: "Port Harcourt Nigeria"
        },
        {
            serialNumber: 4,
            storeName: "Digital Solutions",
            status: "Active",
            avatar_url: "/images/avatar.svg",
            dateJoined: "Saturday, Dec 26, 2025",
            storeLink: "https://www.digital-solutions.com",
            storeAddress: "No 8, Opebi Road, Ikeja, Lagos",
            category: "Software",
            rating: 4,
            categories: ["Software", "IT Services", "Web Development"],
            location: "Ibadan Nigeria"
        }
    ],
    pagination: {
        page: 1,
        pageSize: 10,
        totalRows: 40,
      },

}



const Merchants = () => {
  const [merchant, setMerchant] = useState<any>({})
const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)

const  handleMerchantInfoModal = (row: any) => {
  setMerchant(row)
  setIsViewModalOpen(true);
}
  return (
    <div className='h-full flex-grow'>
        {
            mockData.data.length > 0 ? (
              <div className='h-full flex-grow '>
                <Table data={mockData?.data}
                  hideActionName={true}
                  clickRowAction={(row) => handleMerchantInfoModal(row)}
                  rowActions={(row) => [
                 
                    {
                      name: "View Details",
                      action: () => {handleMerchantInfoModal(row) },
                    },
                  ]}
                  columns={[
                    {
                      header: "S/N",
                      view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
                    },
                    {
                      header: "Store Name",
                      view: (row: any) => <div>{row.storeName}</div>,
                    },
                    {
                      header: "Customer Rating",
                      view: (row: any) => <StarRating totalRatings={row.rating} />,
                    },
                    {
                      header: "Category",
                      view: (row: any) => <Categories categories={row.categories} />,
                    },
                    {
                      header: "Country",
                      view: (row: any) => <div>{row.location}</div>,
                    },

                  ]}
                  loading={false}
                  pagination={mockData.pagination}

                />
                <ViewAddMerchantModal isOpen={isViewModalOpen}  merchant={merchant} closeViewModal={()=>setIsViewModalOpen(false)} />

              </div>
            )
              : (
                <div className='h-auto flex-grow flex justify-center flex-col items-center'>
                  <img src='/images/NoVendor.svg' alt='No Product Found' />
                  <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
                </div>
              )
          }
    </div>
  )
}

export default Merchants


interface Props {
    categories: string[];
}

const Categories: React.FC<Props> = ({ categories }) => {
    return (
        <div className='flex gap-1'>
            {categories.map((category, index) => (
                <React.Fragment key={index}>
                    <p>{category}</p>
                    {index !== categories.length - 1 && <div className='border-r-[1px] pr-1'></div>}
                </React.Fragment>
            ))}
        </div>
    );
};
