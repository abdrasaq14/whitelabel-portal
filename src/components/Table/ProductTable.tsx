import { table } from 'console'
import React from 'react'

interface ProductTableProps {
    columns: {}[]
}

const ProductTable = ({columns}: any) => {
  return (
    <table className=' w-full border-collapse pc-bg-gray-2 '>
        <thead className='bg-[#F0F2F5] '>
                <th className="px-4 mx-2  w-0">
                    <h3 className="text-[#344054] text-xs font-medium">S/N</h3>
                  </th>
                  {columns.map((col:any) => {
                    return(
                        <th
                     key={`${col.header}-head`}
                     className="text-mid-night-80 text-[14px] text-center px-5 py-3 whitespace-nowrap    max-w-sm"
                      >
                    <h3 className="text-[#344054] text-xs  font-medium">{col.header}</h3>
                     </th> 

                    )
                  })}
                  

        </thead>

    </table>
  )
}

export default ProductTable