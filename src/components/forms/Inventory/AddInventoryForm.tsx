import React from 'react'
import AppSelectBox from '../AppSelectBox'
import useUpload from '@/customHooks/useUpload';
import useInventory from '@/customHooks/useInventory';
import { useCustomFormik } from '@/customHooks/useCustomFormik';
import { InventoryValidation } from '@/utilities/validations';
import ValidationError from '../ValidationError';
import { BsExclamationCircle } from 'react-icons/bs';
import AppTextBox from '../AppTextBox';
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums';
import DocumentUpload from '../DocumentUpload/DocumentUpload';
import AddInventoryImage from '../DocumentUpload/AddInventoryImage';
import AppButton from '../AppButton';

const AddInventoryForm = () => {

    const {uploading, handleHoldImage, imageHolder} = useUpload();

    const {handleCreateInventory, handleCreateInventoryCategory, loading} = useInventory();

    const initialValues: any = { 
        categoryName: "", 
        name: "", 
        quantityIn: "", 
        unitPrice: "" 
    };

    const onSubmit = (values: any) => {
        
        if(imageHolder){

            values.image = imageHolder;

            // console.log("Inventory", values);

            handleCreateInventory(values)

        }
        
    };

    const {handleBlur, handleChange, errors, values, handleSubmit, touched} = useCustomFormik(initialValues, onSubmit, InventoryValidation);

    return (
        
        <div>
            
            <form onSubmit={handleSubmit} className='w-full'>
                
                <div className='gap-2 flex flex-col'>
                    
                    <div className='w-full'>
                        <AppSelectBox 
                            name="categoryName" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.categoryName}  
                            topLabel="Item Category" 
                            bottomLabel={touched.categoryName && errors.categoryName ? <ValidationError icon={BsExclamationCircle} message={String(errors.categoryName)} /> : ""}
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Agricultural">Agriculture</option>
                        </AppSelectBox>
                    </div>
                    
                    <div className='w-full'>
                        <AppTextBox 
                            name="name" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.name}  
                            topLabel="Item Name" 
                            type={TextboxType.TEXT} 
                            placeholder='Item name' 
                            bottomLabel={touched.name && errors.name ? <ValidationError icon={BsExclamationCircle} message={String(errors.name)} /> : ""}
                        />
                    </div>

                    <div className='w-full'>
                        <AppTextBox 
                            name="quantityIn" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.quantityIn}  
                            topLabel="Quantity" 
                            type={TextboxType.NUMBER}
                            placeholder='Enter Quaniity' 
                            bottomLabel={touched.quantityIn && errors.quantityIn ? <ValidationError icon={BsExclamationCircle} message={String(errors.quantityIn)} /> : ""}
                        />
                    </div>

                    <div className='w-full'>
                        <AppTextBox 
                            name="unitPrice" 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            value={values.unitPrice}  
                            topLabel="Unit Price" 
                            type={TextboxType.NUMBER} 
                            placeholder='Enter Price' 
                            bottomLabel={touched.unitPrice && errors.unitPrice ? <ValidationError icon={BsExclamationCircle} message={String(errors.unitPrice)} /> : ""}
                        />
                    </div>
                    
                </div>
            
            </form>

            <h6 className='text-base font-satoshiBold text-accent-main my-4'>Attached Image</h6>

            <div className='my-5 flex flex-col justify-center items-center'>
                <DocumentUpload 
                    uploadInterface={<AddInventoryImage loader={{ loading: uploading, type: SpinnerType.PRIMARY, height: 25, width: 25 }} image={imageHolder} />} 
                    validFormats=".jpeg,.png,.jpg"
                    callback={handleHoldImage}
                    // otherData={activeStaff?._id}
                />
                {imageHolder == null ? <ValidationError icon={BsExclamationCircle} message='image is required' /> : ""}
            </div>

            <div className='w-full flex justify-center'>
                <div className='w-[90%] flex justify-center items-center'>
                    
                    <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Add Inventory' handleClick={handleSubmit} />
                
                </div>
            </div>
        
        </div>
    
    )

}

export default AddInventoryForm