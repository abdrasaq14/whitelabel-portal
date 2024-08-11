import React, {FunctionComponent, useRef } from 'react'
import { Button } from '../Button/Button';
import { MdFilterList } from "react-icons/md";
import Select from "./CustomSelect"
import { categories } from '../../utils/categories';



interface FilterITF {
    onClear?: () => void;
    onFilter?: () => void;
    open?: boolean;
    onClose?: () => void;

}

const Filter: FunctionComponent<FilterITF> = ({
    onFilter = () => { },
    onClear = () => { },
    open,
    onClose = () => { } }) => {
    const FilterRef = useRef<any>()



    return (
        <>
            {open && (

                <div className=" fixed top-0 left-0 right-0 bottom-0 items-center  min-w-44 h-screen">
                    <div
                        ref={FilterRef}
                        className=" items-center py-2 px-2 w-[300px] h-screen  bg-white rounded"
                    >
                        <div className="modal-head flex justify-between items-center px-3 pt-6 ">
                            <div className=''>
                                <span className='flex items-center gap-2'> <MdFilterList />Filter</span>
                            </div>
                            <a
                                onClick={onClose}
                                href="#"
                                role="button"
                                className="focus:outline-none text-black ml-auto focus:ring-0  focus:ring-opacity-75"
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
                        <div className="modal-body w-full ">


                            <div className='w-full h-[95vh] overflow-y-auto my-5 gap-3'>

                                <Select options={
                                    categories.map((category, id) => ({ id: id, label: category }))
                                } name='Category' />
                                <Select options={[
                                    { id: 1, label: 'Option 1' },
                                    { id: 2, label: 'Option 2' },
                                    { id: 3, label: 'Option 3' },
                                    { id: 4, label: 'Option 4' },
                                ]} name='Location' />
                                <Select options={[
                                    { id: 1, label: '1 Star' },
                                    { id: 2, label: '2 Star' },
                                    { id: 3, label: '3 Star' },
                                    { id: 4, label: '4 Star' },
                                    { id: 4, label: '5 Star' },
                                ]} name='Rating' />
                                <Select options={[
                                    { id: 1, label: '1 Star' },
                                    { id: 2, label: '2 Star' },
                                    { id: 3, label: '3 Star' },
                                    { id: 4, label: '4 Star' },
                                    { id: 4, label: '5 Star' },
                                ]} name='Sort By' />
                                <Select options={[
                                    { id: 1, label: 'Option 1' },
                                    { id: 2, label: 'Option 2' },
                                    { id: 3, label: 'Option 3' },
                                    { id: 4, label: 'Option 4' },
                                ]} name='Product Type' />
                                <div className='ml-auto flex items-center gap-2'>
                                    <Button className='w-full mx-auto mt-8' label="Search" />
                                </div>
                            </div>





                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Filter