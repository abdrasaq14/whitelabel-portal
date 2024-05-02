
import React, { useRef, useState} from 'react'
import useOnClickOutside from "../../hooks/useClickOutside";
import {ProductImageCarousel} from '../Carousel/Carousel';
import { Modal } from './StaffModal';
import StarRating from '../Rating.tsx';
import CopyToClipboard from '../CopytoClipboard/Copy';
import { MdOutlineArrowForward } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

export const ViewAddMerchantModal = ({merchant, closeViewModal, isOpen}: any) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleAddMerchant = () => {
        setIsConfirmModalOpen(true)
      };
      const handleMerchantAddedSuccess = () => {
        console.log("Hello")
        closeViewModal()
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
      }
     
    
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
      closeViewModal();
      }); 
    return(
        <Modal isOpen={isOpen} closeModal={closeViewModal} containerStyle="flex flex-col p-4 sm:p-8 align-middle sm:max-w-[600px] items-center rounded z-24 bg-white w-[80%] overflow-y-auto max-h-[90%] sm:w-full h-auto gap-4">
            <div className='w-full'>
            <div className='flex w-full justify-between items-center p-2 border-b-[#C8CCD0] border-b-[1px]'>
                <UserProfile name={merchant.storeName} url={merchant.avatar_url} dateJoined={merchant.dateJoined} />
                <button onClick={closeViewModal} className='text-primary-text'><IoCloseCircleOutline size={24} /></button>

            </div>
            <div className='mt-2 w-auto'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Status</p>
                <p className={`mt-1  text-sm font-medum font-satoshiMedium   `}>
                    <span className={`px-2 py-1 rounded-md   ${merchant.status === "Active" ? "bg-green-300 text-green-900" : "text-red-900 bg-red-300"}`}>{merchant.status}</span></p>
            </div>
            <div>
           
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Rating</p>
                <div className='flex gap-2 items-center mt-1'>
                    <p className=' text-primary-text text-base font-medum font-satoshiMedium'>{merchant.rating}/5</p>
                    <StarRating totalRatings={merchant.rating} />
                </div>
            </div>
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Name</p>
                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant.storeName}</p>
            </div>
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Link</p>
                <div className=' flex justify-between w-full'>
                    <p className='text-primary-text text-base font-medum font-satoshiMedium'>{merchant.storeLink}</p>
                    <CopyToClipboard text={merchant.storeLink} />
                </div>
            </div>
            <div className='mt-2 w-full'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Product  Categories</p>
                <Categories categories={merchant.categories} />
            </div>
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Products</p>
                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant.category}</p>
            </div>
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Location</p>
                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant.location}</p>
            </div>
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Address</p>
                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant.storeAddress}</p>
            </div>
            <div className='mt-2'>
                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Date Joined</p>
                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant.dateJoined}</p>
            </div>
            </div>
            <div className='w-full mt-4 flex justify-end'>
            <button
                    type='button'
                    onClick={handleAddMerchant}
                    disabled={false}
                    className='border-none bg-primary border-[1px] rounded-lg text-white text-base inline-flex gap-2  items-center justify-center text-center px-8 py-2 font-medium '>
                    Invite Merchant
                </button>
            </div>
            </div>
            
            
            <ConfirmModal isOpen={isConfirmModalOpen} closeModal={()=>setIsConfirmModalOpen(false)} caption="Are you sure you want to invite this Merchant ???" confirmAddition={handleMerchantAddedSuccess} />

        </Modal>

    )

}

interface Props {
    categories: string[];
  }

const Categories: React.FC<Props> = ({ categories }) => {
    return (
        <div className='flex gap-1 mt-1'>
            { categories && categories.map((category, index) => (
                <React.Fragment key={index}>
                    <p className='text-primary-text text-base font-medum font-satoshiMedium'>{category}</p>
                    {index !== categories.length - 1 && <div className='border-r-[1px] pr-1'></div>}
                </React.Fragment>
            ))}
        </div>
    );
  };

 const UserProfile = ({url, name, dateJoined}: any) => {
    return (
        <div className='flex gap-4 items-center '>
                    <img alt='Employee ' src={url}/>
                        <div>
                        <p className='font-satoshiMedium text-base text-primary-text'>{name}</p>
                        <p className='text-sm font-satoshiMedium text-primary-subtext mt-1'>Joined on {dateJoined}</p>
                    </div>
                </div>
    )
}


export const ConfirmModal = ({isOpen, closeModal, confirmAddition ,caption}: any) => {
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
      closeModal();
      }); 
  
      const handleConfirmAddition = () => {
        console.log("hell0")
        confirmAddition();
        closeModal();
      }
  
    return(
      <Modal isOpen={isOpen} closeModal={closeModal} containerStyle='flex flex-col p-4 sm:p-8 align-middle max-w-2xl items-center rounded z-24 bg-white w-[70%] sm:w-[400px] h-auto'>
           <div className=''>
            <img src='/images/add-product.svg' alt='Delete Staff'  className='max-h-[280px]' />
            </div>
            <div>
                <p className='text-[#2B2C34] mt-4 text-sm text-center  sm:text-base font-satoshiMedium'>{caption}</p>
              </div>
            <div className='w-full flex mt-4 justify-between  '>
                <button
                    type='button'
                     onClick={() => closeModal()}
                    disabled={false}
                    className='border-primary-subtext border-[1px] rounded-lg text-primary text-sm inline-flex gap-2  items-center justify-center text-center sm:w-[40%] px-8 py-3 font-medium hover:bg-purple-700 hover:text-white '
                     >
                      Cancel
                    </button>
           
                     <button
                         type='button'
                          onClick={ handleConfirmAddition}
                          disabled={false}
                          className='bg-primary hover:bg-purple-700 rounded-lg text-white text-sm inline-flex gap-2  items-center justify-center text-center  sm:w-[40%] px-12 py-3  font-medium '
                       >
                          Yes <span><MdOutlineArrowForward size={12}  /></span>
                          </button>
            </div>
      </Modal>
    )
  }