import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUploadSlice, staffUpdated, holdImage } from '@/store/slices/uploadSlice';
import { setUploading, setError } from '@/store/slices/uploadSlice';
import { editUserInfo } from '@/store/slices/accountSlice';
import toast from 'react-hot-toast';
import useStorage from './useStorage';

const useUpload = () => {

    const {updateSessionData} = useStorage();

    const uploadSlice = useAppSelector(getUploadSlice);
    
    const dispatch = useAppDispatch();

    const handleSetError = (error: string | null) => dispatch(setError(error));

    const handleSetUploading = (status: boolean) => dispatch(setUploading(status))

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, callback: (arg0: any, arg1?: any) => void, otherData?: any) => {
        const file = event.target.files?.[0];
        
        if (!file) return;
    
        const cloudName = 'profitall';
        
        const uploadPreset = 'products_upload';
    
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    
        const formData = new FormData();
        
        formData.append('file', file);
        
        formData.append('upload_preset', uploadPreset);
    
        handleSetUploading(true);
        
        handleSetError(null);
    
        try {
          
            const response = await fetch(url, {
            
                method: 'POST',
            
                body: formData,
          
            });
    
            // console.log(response)
    
            if (!response.ok) {
                throw new Error('Failed to upload document');
            }
    
            const data = await response.json();

            // console.log("Upload completed", data);

            //handle any function here
            otherData !== null ? callback(data.secure_url, otherData) : callback(data.secure_url)

        } catch (error: any) {
          
            handleSetError(error.message);
        
        } finally {
          
            handleSetUploading(false);
        
        }
      
    }

    const handleSaveLogoToDb = async (url: string) => {
        
        const userInfoEdited = await dispatch(editUserInfo({companyLogo: url}))

        console.log("DB response", userInfoEdited.payload)

        if(userInfoEdited?.payload?.status === 'Failed'){
            toast.error("Image upload error")
            return;
        }

        updateSessionData('UserData', 'user', userInfoEdited?.payload?.result?.user)

        toast.success("User updated successfully")
    
    }

    const handleSaveStaffImage = async (image: string, id: string) => {
        console.log("SaveImageToDb", image, id)
        const staffInfoEdited = await dispatch(staffUpdated({payload: {image}, id}))

        console.log("DB response", staffInfoEdited.payload)

        if(staffInfoEdited?.payload?.status === 'Failed'){
            toast.error("Image upload error")
            return;
        }

        // updateSessionData('UserData', 'user', staffInfoEdited?.payload?.result?.user)

        toast.success("Updated successfully")
    }

    const handleHoldImage = async (image: string) => dispatch(holdImage(image))


    return {

        uploading: uploadSlice.uploading,

        error: uploadSlice.error,

        handleSetUploading,

        handleSetError,

        handleUpload,

        handleSaveLogoToDb,

        handleSaveStaffImage,

        handleHoldImage,

        imageHolder: uploadSlice.imageHolder

    }
}

export default useUpload