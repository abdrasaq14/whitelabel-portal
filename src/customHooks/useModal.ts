import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeOtpModal } from '@/store/slices/modalSlice';
import { getModalSlice } from '@/store/slices/modalSlice';

const useModal = () => {
    const modalSlice = useAppSelector(getModalSlice);
    
    const dispatch = useAppDispatch();

    const handleCloseOtpModal = () => {
        
        dispatch(closeOtpModal())
    
    }

    return {
        showOtpModal: modalSlice.showOtpModal,
        
        closeOtpModal: handleCloseOtpModal
    }
}

export default useModal