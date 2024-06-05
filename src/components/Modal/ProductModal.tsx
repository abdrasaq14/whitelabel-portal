import React, { useRef, useState } from 'react'
import useOnClickOutside from "../../hooks/useClickOutside";
import { ProductImageCarousel } from '../Carousel/Carousel';
import { Modal } from './StaffModal';
import StarRating from '../Rating.tsx';
import CopyToClipboard from '../CopytoClipboard/Copy';
import { MdOutlineArrowForward } from "react-icons/md";
import { useMutation } from 'react-query';
import { ProductService } from '../../services/product.service';
import toast from 'react-hot-toast';
import { useAuth } from '../../zustand/auth.store';




export const ViewProductModal = ({ product, closeViewModal, isOpen }: any) => {
    const [isProductBan, setIsProductBan] = useState(false);

    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
        closeViewModal();
    });
    const toggleProductBan = () => {
        setIsProductBan(!isProductBan);
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeViewModal} containerStyle="flex flex-col p-4 sm:p-8 align-middle sm:max-w-[600px] items-center rounded z-24 bg-white w-[80%] overflow-y-auto max-h-[70%] sm:w-full h-auto gap-4">
            <div className='grid grid-cols-2 w-full gap-8'>
                <div className='col-span-2 sm:col-span-1 flex flex-col gap-4'>
                    <ProductImageCarousel images={product.gallery_image} />
                </div>
                <div className='col-span-2 sm:col-span-1 flex flex-col gap-4 '>
                    <div className='w-full flex justify-between font-satoshiBold text-primary-text items-center'>
                        <h1 className=' text-2xl'>{product.name}</h1>
                        <p className='text-sm '>N{product.price}</p>
                    </div>
                    <p className='text-primary-subtext font-normal text-sm'>
                        {product.caption}
                    </p>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className='font-bold font-satoshiBold text-sm text-primary-subtext'>Product Type</h2>
                            <p className='text-primary text-xs bg-foundation-lightPurple px-2 py-1 w-auto text-center mt-2 '>{product.type} Product</p>
                        </div>
                        <div>
                            <h2 className='font-bold font-satoshiBold text-sm text-primary-subtext'>Categories</h2>
                            <div className='w-auto flex gap-2 mt-2'>
                                {product && product.categories && product.categories.map((category: string, index: number) => (
                                    <p key={category} className='text-primary text-xs bg-foundation-lightPurple px-2 py-1'>{category}</p>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <div className='w-full flex flex-wrap justify-between gap-4'>
                <button
                    type='button'
                    onClick={() => closeViewModal()}
                    disabled={false}
                    className='border-primary hover:bg-primary border-[1px] rounded-lg text-primary hover:text-white text-base inline-flex gap-2  items-center justify-center text-center px-8 py-2 font-medium '>
                    View Merchant
                </button>
                <div className='gap-4 flex w-full sm:w-auto justify-between'>
                    <button
                        type='button'
                        onClick={() => closeViewModal()}
                        disabled={false}
                        className='border-gray-300 hover:bg-primary-text border-[1px] rounded-lg text-primary-text hover:text-white text-sm inline-flex gap-2  items-center justify-center text-center  px-8 py-2 font-medium '
                    >
                        Back
                    </button>

                    <button
                        type='button'
                        onClick={toggleProductBan}
                        disabled={false}
                        className={` text-sm inline-flex gap-2 rounded-lg items-center justify-center text-center   px-12 py-3  font-medium ${!isProductBan ? 'border-[1px] border-red-500 hover:text-white hover:bg-red-500 text-red-500' : 'text-white bg-green-500 hover:bg-green-800'} `}
                    >
                        {isProductBan ? 'Unban product' : 'Ban product'}
                    </button>
                </div>

            </div>

        </Modal>
    )
}

export const ViewProductDiscoveryModal = ({ product, closeViewModal, isOpen }: any) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const profile: any = useAuth((s) => s.profile)

    console.log(profile);


    const handleAddProduct = () => {
        setIsConfirmModalOpen(true)
    };

    const handleProduct = useMutation(
        async (values: any) => {
            return await ProductService.sendProductRequest(values)
        },

        {
            onSuccess: (res) => {
                if (res.data.status === "Fail") {
                    toast.error(res.data.message)
                } else {
                    setIsConfirmModalOpen(false);
                   toast.success("Request to add the this product has been sent.")
                   closeViewModal()
                }

            },
            onError: (err: any) => {
                toast.error(err.response.data.message);
            }
        }
    )
    const handleProductAddedSuccess = () => {
        const body = [{
            "product": {
                "productId": product.id,
                "productOwnerId": product.userId,
                "productName": product.name
            },
            "whiteLabelClient": {
                "whiteLabelClientId": profile._id,
                "email": profile.email,
                "whiteLabelName": profile.whiteLabelName
            }

        }]

        handleProduct.mutate(body)

    }


    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
        closeViewModal();
    });
    return (
        <Modal isOpen={isOpen} closeModal={closeViewModal} containerStyle="flex flex-col p-4 sm:p-8 align-middle sm:max-w-[600px] items-center rounded z-24 bg-white w-[80%] overflow-y-auto max-h-[70%] sm:w-full h-auto gap-4">
            <div className='grid grid-cols-2 w-full gap-8 '>
                <div className='col-span-2 sm:col-span-1 flex flex-col gap-4'>
                    <ProductImageCarousel images={product.gallery_image} />
                </div>
                <div className='col-span-2 sm:col-span-1 flex flex-col gap-4 '>
                    <div className='w-full flex justify-between font-satoshiBold text-primary-text items-center'>
                        <h1 className=' text-2xl'>{product.name}</h1>
                        <p className='text-sm '>N{product.price}</p>
                    </div>
                    <p className='text-primary-subtext font-normal text-sm'>
                        {product.caption}
                    </p>
                    <div className='flex items-start gap-2 flex-nowrap whitespace-nowrap justify-between'>
                        <div>
                            <h2 className='font-bold font-satoshiBold text-sm text-primary-subtext'>Product Type</h2>
                            <p className='text-primary text-xs bg-foundation-lightPurple px-2 py-1 w-auto text-center mt-2 '>{product.type} Product</p>
                        </div>
                        <div>
                            <h2 className='font-bold font-satoshiBold text-sm text-primary-subtext'>Categories</h2>
                            <div className='w-auto flex items-center whitespace-nowrap flex-wrap gap-2 mt-2'>
                                {product && product.categories && product.categories.map((category: any, index: number) => (
                                    <span key={category} className='text-primary text-xs bg-foundation-lightPurple px-2 py-1'>{category.title}</span>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
                <div className=' col-span-2 w-full  flex flex-col mt-8 gap-4'>
                    <h2 className='font-bold font-satoshiBold text-base text-primary-text'>Product Description</h2>
                    <p className='text-primary-subtext font-normal text-sm'>
                        {product.description}
                    </p>
                    <div>
                        <h2 className='font-bold font-satoshiBold text-base text-primary-text'>Merchant Description</h2>
                        <div className='mt-4'>
                            <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Name</p>
                            <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{product.productOwner}</p>
                        </div>
                        <div className='mt-4'>
                            <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Rating</p>
                            <div className='flex gap-2 items-center mt-1'>
                                <p className=' text-primary-text text-base font-medum font-satoshiMedium'>{product.rating}/5</p>
                                <StarRating totalRatings={product.rating} />
                            </div>
                        </div>
                        <div>
                            <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Link</p>
                            <div className=' flex justify-between w-full'>
                                <p className='text-primary-text text-base font-medum font-satoshiMedium'>{product.storeLink}</p>
                                <CopyToClipboard text={product.storeLink} />
                            </div>
                        </div>
                        <div className='mt-4 w-full'>
                            <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Product  Categories</p>
                            <Categories categories={product.categories} />

                        </div>
                        <div className='w-full mt-4 flex justify-end'>
                            <button
                                type='button'
                                onClick={handleAddProduct}
                                disabled={false}
                                className='border-none bg-primary border-[1px] rounded-lg text-white text-base inline-flex gap-2  items-center justify-center text-center px-8 py-2 font-medium '>
                                Add Product
                            </button>
                        </div>

                    </div>

                </div>



            </div>
            <ConfirmModal isOpen={isConfirmModalOpen} closeModal={() => setIsConfirmModalOpen(false)} caption="Are you sure you want to add this Product ???" confirmAddition={handleProductAddedSuccess} />

        </Modal>

    )

}

interface Props {
    categories: string[];
}
const Categories: React.FC<Props> = ({ categories }) => {
    return (
        <div className='flex items-center whitespace-nowrap flex-wrap gap-1 mt-1'>
            {categories && categories.map((category: any, index) => (
                <React.Fragment key={index}>
                    <p className='text-primary-text text-base font-medum font-satoshiMedium'>{category.title}</p>
                    {index !== categories.length - 1 && <div className='border-r-[1px] pr-1'></div>}
                </React.Fragment>
            ))}
        </div>
    );
};


export const ConfirmModal = ({ isOpen, closeModal, confirmAddition, caption }: any) => {
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
        closeModal();
    });

    const handleConfirmAddition = () => {
        confirmAddition();
        closeModal();
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal} containerStyle='flex flex-col p-4 sm:p-8 align-middle max-w-2xl items-center rounded z-24 bg-white w-[70%] sm:w-[400px] h-auto'>
            <div className=''>
                <img src='/images/add-product.svg' alt='Delete Staff' className='max-h-[280px]' />
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
                    onClick={handleConfirmAddition}
                    disabled={false}
                    className='bg-primary hover:bg-purple-700 rounded-lg text-white text-sm inline-flex gap-2  items-center justify-center text-center  sm:w-[40%] px-12 py-3  font-medium '
                >
                    Yes <span><MdOutlineArrowForward size={12} /></span>
                </button>
            </div>
        </Modal>
    )
}
