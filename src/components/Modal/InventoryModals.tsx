import React, { useState } from 'react'
import Modal from './Modal'
import { FormikProvider, useFormik } from 'formik'
import TextInput from '../FormInputs/TextInput2'
import { categories } from '../../utils/categories'
import FileUpload from '../FormInputs/FIleUpload2'
import { Button } from '../Button/Button'
import { useAuth } from '../../zustand/auth.store'
import { useMutation } from 'react-query'
import { InventoryService } from '../../services/inventory.service'
import toast from 'react-hot-toast'
import { formatAmount } from '../../utils/Helpfunctions'
import useFetchWithParams from '../../hooks/useFetchWithParams'

export const AddInventory = ({ closeViewModal, isOpen }: { isOpen: boolean, closeViewModal: any }) => {
  const profile: any = useAuth((s) => s.profile)
  const form = useFormik({
    initialValues: {
      "name": "",
      "image": "",
      "categoryName": "",
      "quantityIn": 0,
      "quantityOut": 0,
      "unitPrice": 0,
      "whiteLabelName": profile.whiteLabelName
    },

    onSubmit: async (val) => {

      await form.setFieldValue("whiteLabelName", profile.whiteLabelName)
      console.log(val);
      handleAddInventory.mutate(val)


    }


  })


  const handleAddInventory = useMutation(
    async (values: any) => {
      return await InventoryService.createInventory(values)
    },

    {
      onSuccess: (res) => {
        console.log(res);


      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      }
    }
  )
  return (
    <div>
      <Modal open={isOpen} onClick={closeViewModal}>


        <div className='md:w-[552px] w-full px-4 h-auto'>
          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
              <h3 className='text-2xl  mb-4 font-semibold'>Add Inventory</h3>

              <div className='flex-col flex gap-3'>
                <div>
                  <label

                    className='text-sm font-normal font-satoshiRegular text-[#344054]'
                  >
                    Item Category
                  </label>
                  <select className='w-full mt-1 px-4  appearance-none text-xs h-10 py-2.5 focus:outline-none rounded-lg bg-white border border-[#470e812b]'  {...form.getFieldProps("categoryName")} name='categoryName' >
                    <option>Select Category</option>

                    {
                      categories.map((items: any, id) => <option key={id} value={items}>{items}</option>)
                    }

                  </select>
                </div>

                <TextInput placeholder="Item name" name='name' label='Item Name' />
                <TextInput placeholder="Enter Quantity" name='quantityIn' label='Quantity' />
                <TextInput {...form.getFieldProps("unitPrice")} placeholder="0.00" name='unitPrice' label='Unit Price' />

                <div>
                  <label>Attached Image</label>

                  <FileUpload name='image' />
                </div>

              </div>

              <Button isLoading={handleAddInventory.isLoading} className='mt-4 mb-5 w-full' label='Add Inventory' />




            </form>

          </FormikProvider>

        </div>

      </Modal>
    </div>
  )
}

export const ViewInventory = ({ closeViewModal, isOpen, data, onEdit, onDelete }: { isOpen: boolean, closeViewModal: any, data: any, onEdit?: any, onDelete?: any }) => {

  return (
    <div>
      <Modal open={isOpen} onClick={closeViewModal}>
        <div className='md:w-[552px] w-full h-auto px-5'>
          <div className='bg-[#F2F2F2] w-full h-[230px]'>
            {
              data.image && <img src={data.image} className='object-contain mx-auto h-full' />
            }

          </div>

          <div className="my-3 ">
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>{data.name}</h3>

              <h3>{formatAmount(data.unitPrice)}</h3>

            </div>
            <div className='flex items-center gap-3'>
              <div className='flex flex-col gap-3'>
                <h3>Category</h3>

                <span className='bg-primary-light text-primary px-3 py-2 whitespace-nowrap rounded'>{data.categoryName}</span>

              </div>
              <div className='flex flex-col gap-3'>
                <h3>Item Quantity</h3>

                <span className='bg-primary-light text-center text-primary px-3 py-2 whitespace-nowrap rounded'>{data.quantityIn}</span>

              </div>

            </div>

            <div className='flex items-center  gap-4 my-4 justify-end'>
              <Button onClick={async () => {
                await closeViewModal()
                onDelete()
              }} variant='outlined' className='bg-white border border-primary !text-primary' label='Delete Item' />
              <Button onClick={async () => {
                await closeViewModal()
                onEdit()
              }

              } variant='outlined' label='Edit Item' />

            </div>

          </div>

        </div>

      </Modal>

    </div>
  )
}



export const MakeRequest = ({ closeViewModal, isOpen }: { isOpen: boolean, closeViewModal: any }) => {
  const profile: any = useAuth((s) => s.profile)
  const [inventoryItems, setInventoryItems] = useState<any>([]);

  console.log(inventoryItems)

  const form = useFormik({
    initialValues: {
      "quantity": 0,
      "itemId":null,
      "whiteLabelName" : ""
  
    },
    onSubmit: async (val) => {
      // await form.setFieldValue("whiteLabelName", profile.whiteLabelName)
      console.log(profile)
      const itemsToSubmit = inventoryItems.map((item : any) => ({
        itemId: item._id,
        quantity: item.quantity
      }));
      const body = {
        items: itemsToSubmit,
        whiteLabelName:"landMark"
      }
      console.log(body)
      handleAddInventory.mutate(body);
    }


  })

  const handleAddMore = () => {
    setInventoryItems([...inventoryItems, {
      itemId: form.values.itemId,
      quantity: form.values.quantity
    }]);
    form.resetForm({
      values: {
        ...form.initialValues,
      }
    });
  };

  const { data, isLoading, refetch } = useFetchWithParams(
    ["query-all-inventory", {

    }],
    InventoryService.getInventoroes,
    {
      onSuccess: (data: any) => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  )


  const handleAddInventory = useMutation(
    async (values: any) => {
      return await InventoryService.makeRequest(values)
    },

    {
      onSuccess: (res) => {
        console.log(res);


      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      }
    }
  )
  return (
    <div>
      <Modal open={isOpen} onClick={closeViewModal}>


        <div className='md:w-[552px] w-full px-4 h-auto'>
          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
              <h3 className='text-2xl  mb-4 font-semibold'>Add Inventory</h3>

              <div className='flex-col flex gap-3'>
                <div>
                  <label

                    className='text-sm font-normal font-satoshiRegular text-[#344054]'
                  >
                    Available Inventories
                  </label>
                  <select className='w-full mt-1 px-4  appearance-none text-xs h-10 py-2.5 focus:outline-none rounded-lg bg-white border border-[#470e812b]'  {...form.getFieldProps("itemId")} name='itemId' >
                    <option>Select inventory</option>

                    {
                    data && data?.result.map((items: any, id:any) => <option key={id} value={JSON.stringify(items)}>{items.name}</option>)
                    }

                  </select>
                </div>

                <TextInput placeholder="Enter Quantity" name='quantity' label='Quantity' />
              </div>

              {/* <button type="button" onClick={handleAddMore} className='mt-4 mb-5 bg-white font-semibold  !text-primary border border-primary' label='Add More Inventory' /> */}

              <button onClick={handleAddMore} type='button' className='px-3 py-2 rounded border-primary border my-3 ml-auto block text-sm '>Add More Inventory</button>

              <div className='mt-4'>
                <h4 className='text-sm font-semibold mb-2'>Added Inventories</h4>
                {inventoryItems.length === 0 ? (
                  <p className='text-xs'>No inventories added yet.</p>
                ) : (
                  <ul className='list-disc pl-5'>
                    {inventoryItems.map((item:any, index:number) => (
                      <li key={index} className='mb-1'>
                        <span className='font-semibold'>{item.itemName}</span> - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button isLoading={handleAddInventory.isLoading} className='mt-4 mb-5 w-full' label='Add Inventory' />




            </form>

          </FormikProvider>

        </div>

      </Modal>
    </div>
  )
}
