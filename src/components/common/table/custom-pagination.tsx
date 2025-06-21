

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Dispatch, SetStateAction } from "react"


type CustomPaginationProps = {
    page: number
    setPage: Dispatch<SetStateAction<number>>
    pageNumbers: number[]
    previous_page: number | null
    next_page: number | null
}

function CustomPagination({
    page,
    setPage,
    pageNumbers,
    previous_page,
    next_page,
}: CustomPaginationProps) {
    return (
        <Pagination className="">
            <PaginationContent className="rounded-[4px] overflow-hidden gap-0">

                <PaginationItem className="border border-[#D1D5DB] first:rounded-l-[4px] last:rounded-r-[4px]">
                    <PaginationPrevious className={`${previous_page !== null ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} onClick={() => setPage(previous_page || 0)} />
                </PaginationItem>

                {pageNumbers.length > 0 && (
                    <>
                        {/* Always show first page */}
                        <PaginationItem
                            className={`border-y border-r border-[#D1D5DB] ${page === 1 ? 'bg-[#F3F4F6]' : ''}`}
                        >
                            <PaginationLink
                                isActive={page === 1}
                                aria-current={page === 1 ? "page" : undefined}
                                onClick={() => setPage(1)}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>

                        {/* Show left ellipsis if needed */}
                        {page > 4 && (
                            <PaginationItem className="border-y border-r border-[#D1D5DB]">
                                <PaginationEllipsis aria-label="More pages" />
                            </PaginationItem>
                        )}

                        {/* Show pages around current page */}
                        {pageNumbers
                            .filter(
                                num =>
                                    num !== 1 &&
                                    num !== pageNumbers.length &&
                                    num >= page - 1 &&
                                    num <= page + 1
                            )
                            .map(num => (
                                <PaginationItem
                                    key={num}
                                    className={`border-y border-r border-[#D1D5DB] ${page === num ? 'bg-[#F3F4F6]' : ''}`}
                                >
                                    <PaginationLink
                                        isActive={page === num}
                                        aria-current={page === num ? "page" : undefined}
                                        onClick={() => setPage(num)}
                                    >
                                        {num}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                        {/* Show right ellipsis if needed */}
                        {page < pageNumbers.length - 3 && (
                            <PaginationItem className="border-y border-r border-[#D1D5DB]">
                                <PaginationEllipsis aria-label="More pages" />
                            </PaginationItem>
                        )}

                        {/* Always show last page if more than one page */}
                        {pageNumbers.length > 1 && (
                            <PaginationItem
                                className={`border-y border-r border-[#D1D5DB] ${page === pageNumbers.length ? 'bg-[#F3F4F6]' : ''}`}
                            >
                                <PaginationLink
                                    isActive={page === pageNumbers.length}
                                    aria-current={page === pageNumbers.length ? "page" : undefined}
                                    onClick={() => setPage(pageNumbers.length)}
                                >
                                    {pageNumbers.length}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </>
                )}

                <PaginationItem className="border border-[#D1D5DB] first:rounded-l-[4px] last:rounded-r-[4px]">
                    <PaginationNext className={`${next_page !== null ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} onClick={() => setPage(next_page || 0)} />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}


export default CustomPagination