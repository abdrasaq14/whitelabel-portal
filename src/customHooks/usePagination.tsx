<<<<<<< HEAD
import { useState, useCallback, Dispatch, SetStateAction } from "react";
=======
import { useState, useCallback } from "react";
>>>>>>> 53b6d6d (blog module resturecturing)

interface UsePaginationProps {
  total: number;
  limit: number;
<<<<<<< HEAD
  currentPage: number;
  handleNext: () => void;
  handlePrevious: () => void;
  // setPage: Dispatch<SetStateAction<number>>;
=======
>>>>>>> 53b6d6d (blog module resturecturing)
  initialPage?: number; // Optional initial page number
}

const usePagination = ({
  total,
  limit,
<<<<<<< HEAD
  currentPage,
  handleNext,
  handlePrevious,
  initialPage = 1,
}: UsePaginationProps) => {
  const [page, setPage] = useState(currentPage || 1);
  const totalPages = Math.ceil(total / limit);

  // const handleNext = useCallback(() => {
  //   setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  // }, [totalPages]);

  // const handlePrevious = useCallback(() => {
  //   setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  // }, []);
=======
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
>>>>>>> 53b6d6d (blog module resturecturing)

  const onPageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  return {
<<<<<<< HEAD
    totalPages,
    handleNext,
    handlePrevious,
    onPageChange,
=======
    page,
    totalPages,
    handleNext,
    handlePrevious,
    onPageChange
>>>>>>> 53b6d6d (blog module resturecturing)
  };
};

export default usePagination;
