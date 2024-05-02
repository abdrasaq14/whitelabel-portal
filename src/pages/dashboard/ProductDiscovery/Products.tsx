import React, {useState} from 'react'
import { mockProductList } from '../../../utils/ProductList'
import { Table } from '../../../components/Table/Table2'
import StarRating from '../../../components/Rating.tsx';
import { ViewProductModal, ViewProductDiscoveryModal } from '../../../components/Modal/ProductModal';

const Products = () => {
  const [product, setProduct] = useState<any>({})
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)
  const  handleProductInfoModal = (row: any) => {
    setProduct(row)
    setIsViewModalOpen(true);
  }
  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };
  
  return (
    <div className='h-full flex-grow'>
       {
            mockProductList.data.length > 0 ? (
              <div className='h-full flex-grow '>
                <Table data={mockProductList?.data}
                  hideActionName={true}
                  clickRowAction={(row) => handleProductInfoModal(row)}
                  rowActions={(row) => [
                   
                    {
                      name: "View Details",
                      action: () => {handleProductInfoModal(row)},
                    },
                  ]}
                  columns={[
                    {
                      header: "S/N",
                      view: (row: any) => <div className="pc-text-blue">{row.serialNumber}</div>
                    },
                    {
                      header: "Product ID",
                      view: (row: any) => <div>{row.productId}</div>,
                    },
                    {
                      header: "Customer Rating",
                      view: (row: any) => <StarRating totalRatings={row.rating} />,
                    },
                    {
                      header: "Category",
                      view: (row: any) => <Categories categories={row.categories} />,
                    },
                    {
                      header: "Listing Price",
                      view: (row: any) => <div>{row.price} </div>,
                    },
                    {
                      header: "Country",
                      view: (row: any) => <div>{row.location}</div>,
                    },

                  ]}
                  loading={false}
                  pagination={mockProductList.pagination}

                />
                <ViewProductDiscoveryModal isOpen={isViewModalOpen}  product={product} closeViewModal={closeViewModal} />

              </div>
            )
              : (
                <div className='h-auto flex-grow flex justify-center flex-col items-center'>
                  <img src='/images/NoVendor.svg' alt='No Product Found' />
                  <p className='font-normal text-primary-text text-sm sm:text-xl'>No merchants are currently available to sell on your platform.</p>
                </div>
              )
          }
    </div>
  )
}

export default Products

interface Props {
  categories: string[];
}

const Categories: React.FC<Props> = ({ categories }) => {
  return (
      <div className='flex gap-1'>
          { categories && categories.map((category, index) => (
              <React.Fragment key={index}>
                  <p>{category}</p>
                  {index !== categories.length - 1 && <div className='border-r-[1px] pr-1'></div>}
              </React.Fragment>
          ))}
      </div>
  );
};