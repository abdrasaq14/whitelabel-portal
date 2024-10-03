import React, { FunctionComponent, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { MdFilterList } from "react-icons/md";
import Select from "./CustomSelect";
// import { categories } from '../../utils/categories';
import { useQuery } from 'react-query';
import { ProductService } from '../../services/product.service';
import { allStates, nigeriaStates } from '../../utils/states';

interface FilterITF {
    onClear?: () => void;
    onFilter?: (filters: FilterState) => void;
    open?: boolean;
    onClose?: () => void;
    type?: "merchant" | "product";
}

interface FilterState {
    category?: string[];
    location?: string[];
    sortBy?: string[];
    productType?: string;
}


const Filter: FunctionComponent<FilterITF> = ({
    onFilter = () => { },
    onClear = () => { },
    open,
    type = "product",
    onClose = () => { }
}) => {
    const filterRef = useRef<any>();

    // State to store the selected filter values
    const [filters, setFilters] = useState<FilterState>({
        category: [],
        location: [],
        sortBy: [],
    });

    console.log("filters", filters);

    const sortByOptions = type === "product" ? [
        {
            id: 0,
            label: "Pricing: Highest to Lowest",
            value: "price:desc"
        },
        {
            id: 1,
            label: "Pricing: Lowest to Highest",
            value: "price:asc"
        },
        {
            id: 2,
            label: "Alphabetical: A-Z",
            value: "name:asc"
        },
        {
            id: 3,
            label: "Alphabetical: Z-A",
            value: "name:desc"
        }
    ] : [
        {
            id: 0,
            label: "Alphabetical: A-Z",
            value: "businessName:asc"
        },
        {
            id: 1,
            label: "Alphabetical: Z-A",
            value: "businessName:desc"
        }
    ];



    const { data: categories } = useQuery("query-categories",
        async () => {
            return await ProductService.getCategories()
        },
        {
            enabled: true,
            onSuccess: (res) => {
            },
            onError: (err: any) => {
                console.log("Error Occured:", err.response);
            },
        }
    )


    // Handlers to update state for each filter
    const handleSelectChange = (name: keyof FilterState, value: string) => {
        console.log(value)

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));


    };

    // console.log(categories?.data)

    const handleSearch = () => {
        onFilter(filters);
    };

    const handleOnClose = () => {


        onClose()


    }

    return (
        <>
            {open && (
                <div className="fixed top-0 left-0 right-0 bottom-0 items-center min-w-44 h-screen">
                    <div
                        ref={filterRef}
                        className="items-center py-2 px-2 w-[300px] h-screen bg-white rounded"
                    >
                        <div className="modal-head flex justify-between items-center px-3 pt-6">
                            <div className=''>
                                <span className='flex items-center gap-2'>
                                    <MdFilterList />Filter
                                </span>
                            </div>
                            <a
                                onClick={onClose}
                                href="#"
                                role="button"
                                className="focus:outline-none text-black ml-auto focus:ring-0 focus:ring-opacity-75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="modal-body w-full">
                            <div className='w-full h-[95vh] overflow-y-auto my-5 gap-3'>
                                {/* Category Select */}
                                {
                                    type === "product" && categories?.data && categories.data.result.length > 0 && (<Select
                                        onSelect={(value: any) => {
                                            const val = value.map((val: any) => val.value)
                                            handleSelectChange('category', val)
                                        }
                                        }
                                        options={categories?.data.result.map((category: any, id: number) => ({ id: id, label: category.title, value: category._id }))}
                                        name='Categorys'
                                    />)
                                }

                                {/* Location Select */}

                                {
                                    type === "merchant" && (
                                        <Select
                                            isMulti={false}
                                            onSelect={(value: any) => handleSelectChange('location', value)}
                                            options={
                                                allStates.map((state: any, id: number) => ({ id: id, label: state, value: state }))
                                            }
                                            name='Location'
                                        />
                                    )
                                }

                                {/* Rating Select */}

                                {/* Sort By Select */}

                                <Select
                                    isMulti={false}
                                    onSelect={(value: any) => {
                                        const val = value.map((val: any) => val.value)
                                        handleSelectChange('sortBy', val)
                                    }}
                                    options={sortByOptions}
                                    name='Sort By'
                                />
                                {/* Product Type Select */}

                                <div className='ml-auto flex items-center gap-2'>
                                    <Button
                                        className='w-full mx-auto mt-8'
                                        label="Search"
                                        onClick={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Filter;
