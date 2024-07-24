import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
  let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

  if (currentPage - halfMaxPagesToShow <= 0) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }

  if (currentPage + halfMaxPagesToShow > totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        Primera
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          disabled={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Última
      </button>
    </div>
  );
};

export default Pagination;
