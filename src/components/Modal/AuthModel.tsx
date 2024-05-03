import { useRef } from 'react';
import {Modal} from './StaffModal';
import useOnClickOutside from '../../hooks/useClickOutside';

export const LoadingModal = ({isOpen, closeModal}: any) => {
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
      closeModal();
      });
    return (
     <Modal open={isOpen} closeModal={closeModal} containerStyle="text-black flex flex-col justify-center items-center align-middle max-w-2xl  z-20 bg-white w-[80%] rounded-xl h-[50%] sm:w-[553px] sm:h-[332px]">
      <div className='h-48 w-48'>
          <img src="/images/verified-account.svg" alt='Account Verified' style={{objectFit: 'contain'}} />
          </div>
                  
        <p className=' font-normal text-base sm:text-xl  text-primary-text mt-8' >Account Successfully Set up</p>
     </Modal>
    )
  }