import { Pagination } from "@heroui/react";

interface TableBottomContentProps {
    page: number;
    pages: number;
    hasSearchFilter: boolean;
    setPage: (page: number) => void;
}

export default function TableBottomContent({
    page,
    pages,
    hasSearchFilter,
    setPage
}: TableBottomContentProps) {
    return (
        <div className="flex justify-between items-center pt-2 px-2">
            <div className="flex-1 flex justify-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-brand-400 text-background text-white",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="faded"
                    onChange={setPage}
                    dotsJump={(pages/2) +1}
                />
            </div>
            <span className="text-md text-default-400">
                Página {page} de {pages}
            </span>
        </div>
    );
} 