import React, { FC, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import MoreIcon from '../icons/MoreIcon';
import { TableProps } from '@/interfaces/ComponentInterfaces';

const Table: FC<TableProps> = ({ columns, data, additionalActions }) => {

  return (
    <div className='border-[0.4px] border-accent-light4 rounded-t-xl'>
        <table className="min-w-full overflow-hidden rounded-t-xl">
            {/* Table Header */}
            <thead>
                <tr className="bg-accent-light5">
                {columns.map((col) => (
                    <th key={col.key} className="p-5 text-left text-accent-dark4 font-satoshiMedium text-xs">
                    {col.label}
                    </th>
                ))}
                {(additionalActions) && (
                    <th className="p-5 text-left text-gray-700 font-semibold border-b border-gray-200"></th>
                )}
                </tr>
            </thead>

            {/* Table Body */}
            <tbody>
                {data?.map((row, index) => (
                <tr key={row._id} className="hover:bg-purple-lighter">
                    {columns.map((col) => (
                    <td key={col.key} className="p-5 border-b-[0.4px] border-accent-light4 font-satoshiRegular text-sm text-accent-dark4">
                        {col.key === 'sn' ? index+1 : col.render ? col.render(row) : row[col.key]}
                    </td>
                    ))}

                    {/* Actions Column */}
                    {(additionalActions) && (
                    <td className="p-5 border-b-[0.4px] border-accent-light4 flex space-x-2 relative">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton><MoreIcon /></MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {additionalActions(row).map((action, index) => (
                                        <MenuItem key={index}>
                                            <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            onClick={() => action.action()}
                                            >
                                                {action.label}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </td>
                    )}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Table;