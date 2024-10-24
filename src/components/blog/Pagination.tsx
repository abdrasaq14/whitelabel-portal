import React from "react";
import usePagination from "@/customHooks/usePagination";

interface PaginationProps {
  total: number;
  limit: number;
  initialPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  initialPage
}) => {
  const { page, totalPages, handleNext, handlePrevious } = usePagination({
    total,
    limit,
    initialPage
  });

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
