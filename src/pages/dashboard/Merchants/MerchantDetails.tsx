import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { MerchantService } from '../../../services/merchant.service'
import { Label } from '../../../components/Label/Label'
import StarRating from '../../../components/Rating.tsx'
import CopyToClipboard from '../../../components/CopytoClipboard/Copy'
import { fDate, fDateTime } from '../../../utils/formatTime'
import { Table } from '../../../components/Table/Table2'
import { ViewProductModal } from '../../../components/Modal/ProductModal'
import { ProductService } from '../../../services/product.service'
import { SuspendModal } from '../../../components/Modal/MerchantModal'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useAuth } from '../../../zustand/auth.store'
import Spinner from '../../../components/spinner/Spinner'

interface PaginationInfo {
    currentPage: number;
    pageSize: number;
}

const MerchantDetails = () => {
    const navigate = useNavigate()
    const profile: any = useAuth((s) => s.profile)
    console.log("TestingProdile", profile)
    const accountTabTitle = ['Overview', 'All Products', 'Product Sold']
    const [tabIndex, setTabIndex] = useState<number>(0)
    const [isSuspendOpen, setIsSuspendOpen] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { id }: any = useParams()

    const { data: merchant, refetch } = useFetchWithParams(
        ["query-merchant-details", {

            id,

        }, id],
        MerchantService.getMercharntDetails,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const getStatusById = (arr: any, id: string) => {
        const item = arr.find((element: any) => element.platform == id);
        return item && item.status;
    }


    const displayAccountContent = (tabIndex: number) => {
        switch (tabIndex) {
            case 0:
                return <Overview merchant={merchant} />
            // return <BioProfile />
            case 1:
                return <Products />
            case 2:
                return <ProductsSold />
            default:
                return <Overview merchant={merchant} />
            // return <BioProfile />
        }
    }

    const SuspendMerchant = useMutation(async (reason) => {
        const values = {
            "action": "suspend",
            "platform": profile.whiteLabelName,
            "reason": reason
        }
        return await MerchantService.suspendMerchant(values, id);
    },
        {
            onSuccess: () => {
                console.log("SuspendMerchant", SuspendMerchant)
                toast.success("account suspended")
                refetch()
            },
            onError: () => {
                console.log("SuspendMerchant", SuspendMerchant)
                toast.error("Failed to suspend account")
                refetch()
            }
        }
    )

    const unSuspendMerchant = useMutation(async () => {
        const values = {
            "action": "unsuspend",
            "platform": profile.whiteLabelName,
            "reason": "authorized product"
        }
        return await MerchantService.suspendMerchant(values, id);
    },
        {
            onSuccess: () => {
                toast.success("account Activated")
                refetch()
            },
            onError: () => {
                console.log("unSuspendMerchant", unSuspendMerchant)
                toast.error("Failed to activate account")
                refetch()
            }
        }
    )

    const startConversation = useMutation(async (reason) => {
            const values = {
                firstUser: {id: profile._id, phone: profile.phoneNumber, image: profile.companyLogo, email: profile.email, businessName: profile.buinessName},
                secondUser: {id: merchant.result.id, userName: merchant.result.userName, firstName: merchant.result.firstName, lastName: merchant.result.lastName, phone: merchant.result.phone, image: merchant.result.image, email: merchant.result.email}
            }
            console.log("Conversation users", values);
            setLoading(true);
            return await MerchantService.startConversation(values);
        },
        {
            onSuccess: () => {
                setLoading(false)
                toast.success("Conversation started")
                navigate("/message");
            },
            onError: () => {
                setLoading(false)
                toast.error("Failed to start conversation")
            }
        }
    )

    console.log(merchant && (getStatusById(merchant?.result.platformAccess, profile.whiteLabelName.toUpperCase())), merchant?.result.platformAccess, profile.whiteLabelName.toUpperCase(), profile)


    useEffect(() => {

    }, [tabIndex])

    return (
        <div className='px-4 pt-8 h-full'>

            <div className='flex items-center gap-6'>
                <button onClick={() => navigate(-1)} className='flex items-center -mt-6 text-primary gap-2'><img className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
                <BreadCrumbClient backText="All Merchants" currentPath="Account Details" brand='Landmark' />
            </div>

            <div className='my-6 flex items-center justify-between px-6' >

                <div className='flex items-center gap-3'>

                    <div className='relative'>
                        <img src={merchant?.result && merchant?.result.image && merchant?.result.image.trim() ? merchant?.result.image: "/images/no-profile-pics.jpg"} className='w-8 h-8 bg-gray-500 border-primary border rounded-full' />

                        <span className='h-2 w-2 absolute rounded-full bottom-0  right-0 bg-green-500' />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold'>{merchant?.result && merchant.result.businessName}</h3>
                        <a target='_blank' href={`https://www.mymarketsq.com//${merchant?.result && merchant.result.businessName}`} className='text-xs text-[#6F7174]'>{`https://www.mymarketsq.com/${merchant?.result && merchant.result.businessName}`}</a>
                    </div>
                    <button className='border border-primary flex items-center rounded bg-white px-3 py-2 whitespace-nowrap' onClick={() => startConversation.mutate()}>Message Merchant {loading && <Spinner color="#6F7174" width={15} height={15} />}
                    </button>

                </div>
                {profile?.role !== "Staff" &&
                    <>
                    {merchant && (getStatusById(merchant?.result.platformAccess, profile.whiteLabelName.toUpperCase()) == "active") ? <Button label='Suspend Merchant' onClick={() => setIsSuspendOpen(true)} className='px-3 py-2 font-semibold text-sm rounded !bg-[#F03738]  text-white' /> : <Button isLoading={unSuspendMerchant.isLoading} disabled={unSuspendMerchant.isLoading} label='Activate Merchant' onClick={() => unSuspendMerchant.mutate()} className='px-3 py-2 font-semibold text-sm rounded !bg-[#0F973D]  text-white' />}
                    </>
                }

            </div>
            <div className="pt-4 pb-10 px-6 rounded-2xl mx-2">
                <div className="flex items-center mb-10 justify-between gap-10 border-b w-full">
                    <div className="flex items-center w-5/6 gap-2 flex-wrap">
                        {accountTabTitle.map((val, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`py-3 px-6 border-b-2 border-b-transparent !rounded-none hover:text-primary focus:text-primary active:text-primary transition-all
                    ${tabIndex === index && 'text-[#470E81] !border-b-[#470E81]'}
                    ${tabIndex !== index && 'text-[#6C6C73]'}
                  `}
                                onClick={() => setTabIndex(index)}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
                {displayAccountContent(tabIndex)}
            </div>
            <SuspendModal confirmDelete={(reason:any) => { SuspendMerchant.mutate(reason) }} isOpen={isSuspendOpen} closeModal={() => setIsSuspendOpen(false)} merchant={merchant?.result ?? {}} />
        </div>
    )
}

const Overview = ({ merchant }: { merchant: any }) => {




    return (
        <div className='w-full grid grid-cols-2 gap-3'>

            <div className='w-full px-6 py-6 rounded border h-[504px] bg-white'>
                {
                    merchant && <div className='w-full'>

                        <div className='mt-2 w-auto'>
                            <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Status</p>
                            <p className={`mt-1  text-sm font-medum font-satoshiMedium   `}>
                                <span className={`px-2 py-1 rounded-md   ${merchant?.result.status === "Active" ? "bg-green-300 text-green-900" : "text-red-900 bg-red-300"}`}>{merchant?.result.status}</span></p>
                        </div>
                        <div>

                            <div className='mt-2'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Rating</p>
                                <div className='flex gap-2 items-center mt-1'>
                                    <p className=' text-primary-text text-base font-medum font-satoshiMedium'>{merchant?.result.rating}/5</p>
                                    <StarRating totalRatings={merchant?.result.rating} />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Name</p>
                                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant?.result?.businessName}</p>
                            </div>
                            <div className='mt-2'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Link</p>
                                <div className=' flex justify-between w-full'>
                                    <p className='text-primary-text text-base font-medum font-satoshiMedium'>{merchant?.result?.storeLink}</p>
                                    <CopyToClipboard text={merchant?.result?.storeLink} />
                                </div>
                            </div>
                            <div className='mt-2 w-full'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Product  Categories</p>
                                <h3>{merchant?.result?.category}</h3>
                            </div>
                            <div className='mt-2'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Location</p>
                                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '></p>
                            </div>
                            <div className='mt-2'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Store Address</p>
                                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant?.result?.location?.address}</p>
                            </div>
                            <div className='mt-2'>
                                <p className='font-medum font-satoshiMedium text-sm text-primary-subtext'>Date Joined</p>
                                <p className='mt-1 text-primary-text text-base font-medum font-satoshiMedium '>{merchant?.result?.createdAt && fDate(merchant?.result?.createdAt)}</p>
                            </div>
                        </div>

                    </div>
                }


            </div>
            <div className='flex-col flex gap-3 w-full'>
                <div className='w-full bg-white border rounded p-6 h-[176px]'>

                </div>
                <div className='w-full bg-white border rounded p-6 h-[176px]'>

                </div>

            </div>

        </div>
    )
}

const Products = () => {
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [product, setProduct] = useState({})
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const { id }: any = useParams()


    const { data: allProducts, isLoading, refetch } = useFetchWithParams(
        ["query-all-products", {
            merchantId: id,
        }],
        MerchantService.getMerchantProducts,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    const handleViewProductInfo = (row: any) => {
        setProduct(row)
        setIsViewModalOpen(true);
        console.log(row, 'row')
    }
    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };

    const handlePageSize = (val: any) => {
        setPageSize(val);
        // setFilterParams({ ...filterParams, pageSize: val });
    };



    const handleCurrentPage = (val: any) => {
        setCurrentPage(val);
        // setFilterParams({ ...filterParams, pageNum: val - 1 });
    };
    const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
        const { currentPage, pageSize } = pageInfo;
        return (currentPage - 1) * pageSize + index + 1;
    };
    return (

        <div className='h-full flex-auto '>
            <Table data={allProducts && allProducts.result.results}
                hideActionName={true}
                clickRowAction={(row) => handleViewProductInfo(row)}
                onSelectRows={(row: any) => console.log(row)}
                rowActions={(row) => [

                    {
                        name: "View Details",
                        action: () => { handleViewProductInfo(row) },
                    },
                ]}
                columns={[
                    {
                        header: "S/N",
                        view: (row: any, id) => <div className="pc-text-blue">{generateSerialNumber(id, {
                            currentPage,
                            pageSize
                        })}</div>
                    },
                    // {
                    //     header: "Product Id",
                    //     view: (row: any) => <div>{row.id}</div>,
                    // },
                    {
                        header: "Product Name",
                        view: (row: any) => <div>{row.name}</div>,
                    },
                    {
                        header: "Merchant",
                        view: (row: any) => <div>{row.productOwner}</div>,
                    },
                    {
                        header: "Category",
                        view: (row: any) => <div >{row?.categories.map((item: any) => item.title).join(" | ")} </div>,
                    },
                    {
                        header: "Date Listed",
                        view: (row: any) => <div>{row.createdAt && fDateTime(row.createdAt)}</div>,
                    },

                ]}
                loading={isLoading}
                pagination={{

                    page: currentPage,
                    pageSize: pageSize,
                    totalRows: allProducts?.result.totalPages,
                    setPageSize: handlePageSize,
                    setPage: handleCurrentPage
                }}

            />
            <ViewProductModal isOpen={isViewModalOpen} product={product} closeViewModal={closeViewModal} />

        </div>
    )
}

const ProductsSold = () => {
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [product, setProduct] = useState({})
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const { id } = useParams()


    const { data: allProducts, isLoading } = useFetchWithParams(
        ["query-all-products-sold", {
            merchantId: id, page: currentPage
        }],
        ProductService.getProductsSold,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )


    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };

    const handlePageSize = (val: any) => {
        setPageSize(val);
        // setFilterParams({ ...filterParams, pageSize: val });
    };

    const handleCurrentPage = (val: any) => {
        setCurrentPage(val);
        // setFilterParams({ ...filterParams, pageNum: val - 1 });
    };
    const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
        const { currentPage, pageSize } = pageInfo;
        return (currentPage - 1) * pageSize + index + 1;
    };
    return (

        <div className='h-full flex-grow '>
            <Table data={allProducts && allProducts.result.results}
                hideActionName={true}
                // rowActions={(row) => [
                //   {
                //     name: "View Product",
                //     action: () => {
                //       handleViewProductInfo(row)
                //     },
                //   },
                //   {
                //     name: "Ban product",
                //     action: () => {
                //       handleViewProductInfo(row)
                //     },
                //   },
                //   {
                //     name: "View Seller",
                //     action: () => {
                //       handleViewProductInfo(row)
                //     },
                //   },
                // ]}
                columns={[
                    {
                        header: "S/N",
                        view: (row: any, id) => <div className="pc-text-blue">{generateSerialNumber(id, {
                            currentPage,
                            pageSize
                        })}</div>
                    },
                    // {
                    //     header: "Product Id",
                    //     view: (row: any) => <div>{row._id}</div>,
                    // },
                    {
                        header: "Product Name",
                        view: (row: any) => <div>{row.name}</div>,
                    },
                    {
                        header: "Merchant",
                        view: (row: any) => <div>{row.productOwner}</div>,
                    },
                    {
                        header: "Category",
                        view: (row: any) => <div >{row?.categories.map((item: any) => item.title).join(" | ")} </div>,
                    },
                    {
                        header: "Date Listed",
                        view: (row: any) => <div>{row.createdAt && fDateTime(row.createdAt)}</div>,
                    },

                ]}
                loading={isLoading}
                pagination={{

                    page: currentPage,
                    pageSize: pageSize,
                    totalRows: allProducts?.result.totalPages,
                    setPageSize: handlePageSize,
                    setPage: handleCurrentPage
                }}

            />
            <ViewProductModal isOpen={isViewModalOpen} product={product} closeViewModal={closeViewModal} />

        </div>
    )
}

export default MerchantDetails