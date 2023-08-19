"use client"
import {Pagination} from "@nextui-org/pagination";
import {useCallback} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


export function PhoneCasePagination({total, page = 1}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const onPageChange = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams)
            params.set("page", String(page))
            router.replace(pathname + "?" + params.toString())
        },
        [searchParams]
    )


    if (!total || !page) return
    return (
        <div>
            <Pagination
                total={total} page={Number.parseInt(page)} onChange={onPageChange}
                showControls={true} isCompact={true}
            />
        </div>
    )
}