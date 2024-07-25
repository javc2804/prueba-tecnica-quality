import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export function PaginationDemo({
  totalPages,
  onPageChange,
  currentPage,
}: Props) {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? null : (
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
            ></PaginationPrevious>
          )}
        </PaginationItem>
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onPageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && <PaginationEllipsis />}
          </>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={currentPage === startPage + index}
              onClick={() => onPageChange(startPage + index)}
            >
              {startPage + index}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          {currentPage === totalPages ? null : (
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
            ></PaginationNext>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationDemo;
