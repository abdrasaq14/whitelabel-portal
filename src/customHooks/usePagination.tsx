import { useState, useCallback } from "react";

interface UsePaginationProps {
  total: number;
  limit: number;
  initialPage?: number; // Optional initial page number
}

const usePagination = ({
  total,
  limit,
  initialPage = 1
}: UsePaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.ceil(total / limit);

  const handleNext = useCallback(() => {
    setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  }, [totalPages]);

  const handlePrevious = useCallback(() => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }, []);

  const onPageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  return {
    page,
    totalPages,
    handleNext,
    handlePrevious,
    onPageChange
  };
};

export default usePagination;
