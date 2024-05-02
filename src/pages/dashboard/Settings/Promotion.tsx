import React, { useState } from 'react'
import { Button } from '../../../components/Button/Button'
import Modal from '../../../components/Modal/Modal'
import { FormikProvider, useFormik } from 'formik'
import TextInput from '../../../components/FormInputs/TextInput2'

const Promotion = () => {
    const [show ,setShow] = useState(false)

    const form = useFormik({
        initialValues: {
            benefactor: '',
            percentage: '',
            category: '',
            startDate: '',
            endDate: ''
        }, onSubmit: (val) => {

        }
    })

    
    return (
        <div>
            <Modal open={show} >
                <div className='w-full px-5 py-2 md:w-[572px] h-[502px] '>
                    <FormikProvider value={form}>
                        <form className='flex flex-col gap-5 ' onSubmit={form.handleSubmit}>

                            <div>
                                <label className='font-medium'>Benefactor</label>
                                <TextInput name='select' />
                            </div>

                            <div>
                                <label className='font-medium'>Product Category</label>
                                <TextInput name='select' />
                            </div>
                            <div>
                                <label className='font-semibold'>Discount Percentage</label>
                                <TextInput name='name' />
                            </div>

                            <div className='grid gap-2 grid-cols-2'>
                                <div>
                                    <label className='font-semibold'>Benefactor</label>
                                    <TextInput name='select' />
                                </div>
                                <div>
                                    <label className='font-semibold'>Benefactor</label>
                                    <TextInput name='select' />
                                </div>
                            </div>

                        </form>
                    </FormikProvider>


                </div>
            </Modal>
            <div className="w-full px-2 py-2">
                <div className='w-full gap-4 flex justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold'>Promotion & Discount</h3>
                        <p className='mt-4'>You can utilize this section to create product discounts tailored for specific users or customers shopping on your marketplace. This feature enables you to offer targeted promotions, enhancing customer engagement and satisfaction.</p>
                    </div>

                    <button onClick={() => setShow(!show)} className='whitespace-nowrap h-[48px] bg-primary text-white px-3 rounded' > Create Discount</button>

                </div>

                <div className='grid grid-cols-2 my-4 gap-2'>
                    <DiscountCard />
                    <DiscountCard />
                    <DiscountCard />
                    <DiscountCard />
                </div>

            </div>
        </div>
    )
}

const DiscountCard = () => {

    return (
        <div className='px-3 py-2 my-2 border rounded'>
            <div>
                <div className="flex items-center justify-between">
                    <h3 className='mb-2 font-medium'>Discount & Promotions</h3>
                </div>

                <div className='w-full rounded-lg h-[116px]'>
                    <img src='/images/discount.png' className='w-full rounded-lg h-full object-cover' />

                </div>
                <div className='flex flex-col gap-2 my-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xs text-gray-600'>Benefactor</h3>
                        <h3 className='text-sm'>All</h3>

                    </div><div className='flex items-center justify-between'>
                        <h3 className='text-xs text-gray-600'>Product Category</h3>
                        <h3 className='text-sm'>Electronics</h3>

                    </div>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xs text-gray-600'>Discount Percentage</h3>
                        <h3 className='text-sm'>30%</h3>

                    </div>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xs text-gray-600'>Expired on</h3>
                        <h3 className='text-sm0'>4th November, 2024</h3>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Promotion