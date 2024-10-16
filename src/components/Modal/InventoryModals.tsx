import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
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
import { Table } from '../Table/Table2'
import { fDate } from '../../utils/formatTime'
import { mergeItemsWithDetails } from '../../utils/functions'
import { Label } from '../Label/Label'

export const AddInventory = ({ closeViewModal, isOpen }: { isOpen: boolean, closeViewModal: any }) => {
  const profile: any = useAuth((s) => s.profile)
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    image: Yup.string()
      .url('Image must be a valid URL')
      .required('Image URL is required'),
    categoryName: Yup.string()
      .required('Category name is required')
      .min(2, 'Category name must be at least 2 characters long'),
    quantityIn: Yup.number()
      .required('Quantity In is required')
      .integer('Quantity In must be an integer')
      .min(1, 'Quantity In cannot be less than 1'),
    unitPrice: Yup.number()
      .required('Unit Price is required')
      .positive('Unit Price must be greater than zero')
      .min(1, 'Unit Price cannot be less than 1')
  });
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
    validationSchema,
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
        toast.success("Inventory Added Successfully")
        form.resetForm()
        closeViewModal()

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
                    Item Category*
                  </label>
                  <select className='w-full mt-1 px-4  appearance-none text-xs h-10 py-2.5 focus:outline-none rounded-lg bg-white border border-[#470e812b]'  {...form.getFieldProps("categoryName")} name='categoryName' >
                    <option>Select Category</option>

                    {
                      categories.map((items: any, id) => <option key={id} value={items}>{items}</option>)
                    }

                  </select>
                </div>

                <TextInput placeholder="Item name" name='name' label='Item Name*' />
                <TextInput placeholder="Enter Quantity" name='quantityIn' label='Quantity*' />
                <TextInput {...form.getFieldProps("unitPrice")} placeholder="0.00" name='unitPrice' label='Unit Price*' />

                <div>
                  <label>Attach Image*</label>

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

export const ViewInventory = ({ closeViewModal, isOpen, data, onEdit, onDelete, isAdmin = true }: { isOpen: boolean, closeViewModal: any, data: any, onEdit?: any, onDelete?: any, isAdmin?: boolean }) => {

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

            {/* {
              isAdmin && <div className='flex items-center  gap-4 my-4 justify-end'>
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
            } */}



          </div>

        </div>

      </Modal>

    </div>
  )
}



export const MakeRequest = ({ closeViewModal, isOpen }: { isOpen: boolean, closeViewModal: any }) => {
  const profile: any = useAuth((s) => s.profile)
  console.log(profile)
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  const [selected, setSelected] = useState<any>({})


  // console.log(selected)

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be greater than zero')
      .max(selected?.quantityIn ?? 10, "Quantity can't be greater than available quantity")
      .min(1, 'Quantity must be greater than one'),
    itemId: Yup.string().required('Item is required'),
  });

  const form: any = useFormik({
    initialValues: {
      quantity: "",
      itemId: ""
    },
    validationSchema,
    onSubmit: async (val: any) => {
      const currentFormItem = JSON.parse(val.itemId);
      const itemsToSubmit = [
        ...inventoryItems.map((item: any) => ({
          itemId: item._id,
          quantity: item.quantity
        })),
        ...(val.itemId && val.quantity ? [{
          itemId: currentFormItem._id,
          quantity: val.quantity
        }] : [])
      ];
      const body: any = { whiteLabelName: profile.whiteLabelName, items: itemsToSubmit }
      console.log("submit");

      handleAddInventory.mutate(body);
    }
  });

  useEffect(() => {
    if (form.values.itemId == undefined || form.values.itemId == "" || form.values.itemId == null) {
      return

    } else {
      setSelected(JSON.parse(form.values.itemId))
    }

    // console.log(form.values.itemId)


  }, [form.values.itemId])

  const { data, isLoading, refetch } = useFetchWithParams(
    ["query-all-inventory", { page: 1, limit: 1000, whiteLabelName: profile.whiteLabelName, }],
    InventoryService.getInventoroes,
    {
      onSuccess: () => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  const handleAddInventory = useMutation(
    async (values) => {
      return await InventoryService.makeRequest(values);
    },
    {
      onSuccess: (res) => {
        // console.log(res);
        form.resetForm()
        toast.success("Inventory Request Submitted")
        closeViewModal()
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      }
    }
  );

  const handleAddMore = () => {
    const selectedItem = JSON.parse(form.values.itemId);
    setInventoryItems((prevItems: any) => {
      const existingItemIndex = prevItems.findIndex((item: any) => item._id === selectedItem._id);
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += form.values.quantity;
        return updatedItems;
      } else {
        // Item does not exist, add new item
        return [...prevItems, {
          ...selectedItem,
          quantity: form.values.quantity
        }];
      }
    });
    form.resetForm({
      values: {
        ...form.initialValues,
      }
    });
  };

  const handleRemoveItem = (index: any) => {
    setInventoryItems(inventoryItems.filter((_: any, i: number) => i !== index));
  };

  return (
    <div>
      <Modal open={isOpen} onClick={closeViewModal}>


        <div className='md:w-[552px] w-full px-4 h-auto'>
          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
              <h3 className='text-2xl  mb-4 font-semibold'>Make Request</h3>

              <div className='flex-col flex gap-3'>
                <div>
                  <label

                    className='text-sm font-normal font-satoshiRegular text-[#344054]'
                  >
                    Available Inventories
                  </label>
                  <select className='w-full mt-1 px-4  appearance-none text-xs h-10 py-2.5 focus:outline-none rounded-lg bg-white border border-[#470e812b]'  {...form.getFieldProps("itemId")} name='itemId' >
                    <option value="">Select inventory</option>

                    {
                      data && data?.result.results.map((items: any, id: any) => <option key={id} value={JSON.stringify(items)}>{items.name}</option>)
                    }

                  </select>
                </div>

                <TextInput type="number" placeholder="Enter Quantity" name='quantity' label='Quantity' />
              </div>

              {/* <button type="button" onClick={handleAddMore} className='mt-4 mb-5 bg-white font-semibold  !text-primary border border-primary' label='Add More Inventory' /> */}

              <button onClick={handleAddMore} type='button' className='px-3 py-2 rounded border-primary border my-3 ml-auto block text-sm '>Add More Inventory</button>

              <div className='mt-4'>
                <h4 className='text-sm font-semibold mb-2'>Added Inventories <span className='h-4 px-2  text-center rounded-full text-xs bg-primary text-white'>{inventoryItems.length}</span></h4>
                {inventoryItems.length === 0 ? (
                  <p className='text-xs'>No inventories added yet.</p>
                ) : (
                  <table className='w-full'>
                    <thead>
                      <tr className='text-left text-xs'>
                        <th className='py-1'>Category</th>
                        <th className='py-1'>Name</th>
                        <th className='py-1'>Quantity</th>
                        <th className='py-1'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryItems.map((item: any, index: number) => (
                        <tr key={index} className='text-sm'>
                          <td className='py-1 mb-1'>{item.categoryName}</td>
                          <td className='py-1 mb-1'>{item.name}</td>
                          <td className='py-1 mb-1'>{item.quantity}</td>
                          <td className='py-1 mb-1'>
                            <button type='button' onClick={() => handleRemoveItem(index)} className='text-red-500'>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>

              <Button onClick={form.handleSubmit} isLoading={handleAddInventory.isLoading} className='mt-4 mb-5 w-full' label='Proceed' />




            </form>

          </FormikProvider>

        </div>

      </Modal>
    </div>
  )
}

export const InventoryRequestDetails = ({ closeViewModal, isOpen, details, isAdmin = true, isHistory }: { isOpen: boolean, closeViewModal: any, details: any, isAdmin?: boolean, isHistory?: boolean }) => {

  const handleApprove = useMutation(
    async () => {
      const values = {
        "status": "APPROVED",
        "requestId": details._id
      }
      return await InventoryService.updateInventoryRequest(values);
    },
    {
      onSuccess: (res) => {
        toast.success("Inventory Request Approved")
        closeViewModal()

      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        closeViewModal()

      }
    }
  )

  const handleDecline = useMutation(
    async () => {
      const values = {
        "status": "DECLINED",
        "requestId": details._id
      }
      return await InventoryService.updateInventoryRequest(values);
    },
    {
      onSuccess: (res) => {
        toast.success("Inventory Request Declined")
        closeViewModal()
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        closeViewModal()

      }
    }
  )

  return (
    <div>
      <Modal open={isOpen} onClick={closeViewModal} >

        <div className='md:w-[552px] w-full px-4 h-auto'>
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-semibold'>{isHistory ? 'Inventory History' : "Inventory Request"}</h3>
            <Label variant='success' >{details.status}</Label>
          </div>


          <Table
            data={details && mergeItemsWithDetails(details.items, details.itemDetails)}
            columns={[
              {
                header: "S/N",
                view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
              },
              {
                header: "Item",
                view: (row: any) => <div className='flex  items-center gap-3'><img alt='' className='h-12 outline-0 border-0 w-12 bg-gray-200 object-contain' src={row.image ?? ""} />{row.name}</div>,
              },
              {
                header: "Quantity",
                view: (row: any) => <div>{row.quantity}</div>,
              }


            ]}
            loading={false}
          />


          {
            isAdmin && <div className='grid my-3 grid-cols-2 gap-3 items-center'>
              <button onClick={() => handleDecline.mutate()} className='w-full text-center py-3 rounded bg-white border border-primary'>Decline</button>
              <button onClick={() => handleApprove.mutate()} className='w-full text-center py-3 rounded text-white border bg-primary'>Approve</button>

            </div>
          }



        </div>

      </Modal>
    </div>
  )

}
