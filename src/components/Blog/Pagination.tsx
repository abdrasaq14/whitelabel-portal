import React from "react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  increase: () => void;
  decrease: () => void;
  onPageChange?: (page: number) => void; // Optional callback when the page changes
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  increase,
  decrease,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    if (page < totalPages) {
      increase();
      onPageChange && onPageChange(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      decrease();
      onPageChange && onPageChange(page - 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
