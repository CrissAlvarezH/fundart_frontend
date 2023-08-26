import Link from "next/link";
import {makeReadable} from "@/utils/money";
import {Pagination} from "@nextui-org/pagination";
import {PhoneCasePagination} from "@/components/phone-case-list/PhoneCasePagination";
import {Button} from "@nextui-org/button";
import {MinusIcon, PlusIcon} from "@/components/Icons";
import {Spacer} from "@nextui-org/spacer";
import {PhoneCaseItem} from "@/components/phone-case-list/phone-case-item";


async function fetchImagePhoneCases(page = 1, tags = [], case_id = undefined) {
    const params = new URLSearchParams({
        page: String(page), tags: tags.join(",")
    })
    if (case_id) params.set("case_id", case_id)

    let resp = await fetch(
        "http://127.0.0.1:8000/api/v1/images-phone-cases/?" + params, {cache: "no-store"}
    )
    resp = await resp.json()
    return resp
}


export async function PhoneCaseList({page = 1, tags = [], case_id = undefined}) {
    const cases = await fetchImagePhoneCases(page, tags || [], case_id)
    console.log("cases", cases)

    return (
        <div className="w-full">
            <div className="grid p-5 grid-cols-4 gap-5 w-full">
                {
                    cases.results.map(c => (
                        <PhoneCaseItem key={c.id} {...c}/>
                    ))
                }
            </div>
            <div className="flex justify-center pb-5 pt-2">
                <PhoneCasePagination page={page} total={cases.pagination.total_pages}/>
            </div>
        </div>
    )
}

