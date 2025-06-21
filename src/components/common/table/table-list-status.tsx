

type TableListStatusProps = {
    total_entries: number;
    page: number;
    page_size: number;
};

function TableListStatus({ total_entries, page, page_size }: TableListStatusProps) {
    return (
        total_entries && total_entries > 0 ? (
            <p className="text-sm">
                Showing{" "}
                <span className="font-bold">
                    {((page - 1) * page_size) + 1}
                    -
                    {Math.min(page * page_size, total_entries)}
                </span>{" "}
                of <span className="font-bold">{total_entries}</span>
            </p>
        ) : (
            <p className="text-sm">No entries to show</p>
        )
    )
}

export default TableListStatus;