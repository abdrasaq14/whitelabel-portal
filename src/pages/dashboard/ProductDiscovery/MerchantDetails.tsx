import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { MerchantService } from '../../../services/merchant.service'
// import { Label } from '../../../components/Label/Label'
// import StarRating from '../../../components/Rating.tsx'
// import CopyToClipboard from '../../../components/CopytoClipboard/Copy'
import { fDateTime } from '../../../utils/formatTime'
import { Table } from '../../../components/Table/Table2'
import { ViewProductDiscoveryModal} from '../../../components/Modal/ProductModal'
import { ProductService } from '../../../services/product.service'
// import { SuspendModal } from '../../../components/Modal/MerchantModal'
import SearchInput from '../../../components/FormInputs/SearchInput'
import { useMutation } from 'react-query'
import { useAuth } from '../../../zustand/auth.store'
import toast from 'react-hot-toast'
import Spinner from '../../../components/spinner/Spinner'

interface PaginationInfo {
    currentPage: number;
    pageSize: number;
}

const MerchantDetails = () => {
    const navigate = useNavigate()
    const accountTabTitle = ['All Products']
    const [tabIndex, setTabIndex] = useState<number>(0)
    const [selectedProducts, setSelectedProducts] = useState<any>([])
    // const [showFilter, setShowFilter] = useState<boolean>(false)
    const [product, setProduct] = useState({})
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const profile: any = useAuth((s) => s.profile)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    const { id }: any = useParams()


    const { data: allProducts, isLoading } = useFetchWithParams(
        ["query-all-products", {
            merchantId: id, page: currentPage, search
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
    }

    const { data: merchant } = useFetchWithParams(
        ["query-merchant", {

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

    console.log(merchant)


    const AddAllProducts = useMutation(async () => {
        const body = {
            "merchant": {
                "id": merchant.result.id,
                "email": merchant.result.email,
                "name": merchant.result.businessName
            },
            "whiteLabelClient": {
                "id": profile._id,
                "email": profile.email,
                "name": profile.whiteLabelName
            },
            "requestType": "allproducts"
        }
        return await ProductService.addAllProducts(body);
    },
        {
            onSuccess: () => {
                toast.success("request sent successfully")
                navigate(-1)
            },
            onError: (err: any) => {
                toast.error(err.response.data.message)

            }
        }
    )

    const AddProducts = useMutation(async () => {
        const formattedBody = selectedProducts.map((product: any) => ({
            product: {
                productId: product.id,
                productOwnerId: product.userId,
                productName: product.name
            },
            whiteLabelClient: {
                whiteLabelClientId: profile._id,
                email: profile.email,
                whiteLabelName: profile.whiteLabelName
            }
        }));
        console.log(formattedBody, "body")
        return await ProductService.sendProductRequest(formattedBody);
    },
        {
            onSuccess: () => {
                toast.success("request sent successfully")
                //    navigate(-1)
            },
            onError(error: any) {
                toast.error(error.response.data.message);

            },
        }
    )

    // console.log(selectedProducts)




    useEffect(() => {

    }, [tabIndex])

    return (
        <div className='px-4 pt-8 h-full'>

            <div className='flex items-center gap-6'>
                <button onClick={() => navigate(-1)} className='flex items-center -mt-6 text-primary gap-2'><img alt="alt_img" className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
                <BreadCrumbClient backText="All Merchants" currentPath="Account Details" brand='Landmark' />
            </div>

            <div className='my-6 rounded flex items-center justify-between px-6' >

                <div className='flex items-center gap-3'>

                    <div className='relative'>
                            <img src={merchant?.result && merchant?.result.image && merchant?.result.image.trim() ? merchant?.result.image: "/images/no-profile-pics.jpg"} className='w-8 h-8 bg-gray-500 border-primary border rounded-full' />
                        {/* <img alt="mct_img" src={merchant?.result && merchant?.result.image} className='w-8 h-8 bg-gray-500 border-primary border rounded-full' /> */}

                        <span className='h-2 w-2 absolute rounded-full bottom-0  right-0 bg-green-500' />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold'>{merchant?.result && merchant.result.businessName}</h3>
                        <a target='_blank' rel="noreferrer" href={`https://www.mymarketsq.com//${merchant?.result && merchant.result.userName}`} className='text-xs text-[#6F7174]'>{`https://www.mymarketsq.com/${merchant?.result && merchant.result.userName}`}</a>
                    </div>

                </div>

                {/* {merchant?.result.status === "Active" ? <button onClick={() => setIsSuspendOpen(true)} className='px-3 py-2 font-semibold text-sm rounded bg-[#F03738]  text-white'>Suspend Merchant</button> : <button className='px-3 py-2 font-semibold text-sm rounded bg-[#0F973D]  text-white'>Activate Merchant</button>} */}

            </div>
            <div className="pt-4 pb-10 px-6 rounded-2xl mx-2">
                <div className="flex items-center mb-10 justify-between gap-10 border-b w-full">
                    <div className="flex  items-center w-5/6 gap-2 flex-wrap">
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

                    <div className='flex items-center gap-3'>
                        <SearchInput onClear={() => setSearch("")} value={search} onChange={(e: any) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }} className='w-[200px]' placeholder='Search for products' />
                        {
                            allProducts && (
                                (selectedProducts.length > 0) ? <Button disabled={AddProducts.isLoading} isLoading={AddProducts.isLoading} onClick={() => AddProducts.mutate()} label="Add selected products" className='px-3 py-2 whitespace-nowrap font-semibold border-primary  border text-sm rounded bg-primary ' /> : <Button label='Add all Products' disabled={AddAllProducts.isLoading} isLoading={AddAllProducts.isLoading} onClick={() => AddAllProducts.mutate()} className='px-3 py-2 whitespace-nowrap font-semibold text-sm rounded bg-primary border-primary border ' />

                            )
                        }
                    </div>
                </div>
                <div className='h-full flex-auto '>
                    {
                        allProducts && allProducts?.result?.results.length > 0 ?
                            <Table data={allProducts && allProducts?.result?.results.length > 0 && allProducts?.result?.results}
                                hideActionName={true}
                                emptyMessage={<div className='h-full flex-grow flex justify-center items-center'>
                                    <img src='/images/NoProduct.svg' alt='No Product Found' />
                                </div>}
                                clickRowAction={(row) => handleViewProductInfo(row)}
                                onSelectRows={(row: any) => setSelectedProducts(Array.from(row.values()))}
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
                                    //     view: (row: any) => <div className='flex items-center gap-3'><img alt="row-img" src={row.image ?? ""} className='h-10 w-10 object-contain' />{row.id}</div>,
                                    //   },
                                    {
                                        header: "Product Name",
                                        view: (row: any) => <div className='whitespace-wrap text-wrap text-ellipsis !whitespace-normal min-w-[300px]'>{row.name}</div>,
                                    },
                                    // {
                                    //     header: "Category",
                                    //     view: (row: any) => <div >{row?.categories.map((item: any) => item.title).join(" | ")} </div>,
                                    // },
                                    {
                                        header: "Date Listed",
                                        view: (row: any) => <div>{row.createdAt && fDateTime(row.createdAt)}</div>,
                                    },

                                ]}
                                loading={isLoading}
                                pagination={{

                                    page: currentPage,
                                    pageSize: pageSize,
                                    totalRows: allProducts?.result.totalResults,
                                    setPageSize: handlePageSize,
                                    setPage: handleCurrentPage
                                }}

                            /> : <div className='h-full flex-grow flex justify-center items-center'>
                                {
                                isLoading ? <Spinner color='#000' /> : <img src='/images/NoProduct.svg' alt='No Product Found' />
                                }

                            </div>
                    }

                    <ViewProductDiscoveryModal isOpen={isViewModalOpen} product={product} closeViewModal={closeViewModal} />

                </div>
            </div>
        </div>
    )
}






export default MerchantDetails