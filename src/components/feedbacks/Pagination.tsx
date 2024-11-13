import React from 'react';
import AppButton from '../forms/AppButton';
import { ButtonType } from '@/enums/ComponentEnums';
import { PaginationProps } from '@/interfaces/ComponentInterfaces';

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (pageNumber: number) => {
        
        onPageChange(pageNumber);
    
    };

    return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        
        <div className='flex w-[100px]'><AppButton handleClick={() => onPageChange(page - 1)} type={page === 1 ? ButtonType.DISABLED : ButtonType.SECONDARY} text="Previous" /></div>

            {pageNumbers.map((pageNumber) => (
                
                <div className="w-[50px]">
                
                    <AppButton
                    key={pageNumber}
                    handleClick={() => handlePageClick(pageNumber)}
                    type={ButtonType.PRIMARY}
                    text={String(pageNumber)}
                    />
                
                </div>
            ))}

            <div className='flex w-[100px]'><AppButton text="Next" handleClick={() => onPageChange(page + 1)} type={page === totalPages ? ButtonType.DISABLED : ButtonType.SECONDARY} /></div>
        
        </div>
    );

};

export default Pagination;