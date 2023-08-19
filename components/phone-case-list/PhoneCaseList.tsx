import Link from "next/link";
import {makeReadable} from "@/utils/money";
import {Pagination} from "@nextui-org/pagination";
import {PhoneCasePagination} from "@/components/phone-case-list/PhoneCasePagination";


async function fetchImagePhoneCases(page = 1, tags = [], case_id = undefined) {
    const params = new URLSearchParams({
        page: String(page), tags: tags.join(",")
    })
    if (case_id) params.set("case_id", case_id)

    let resp = await fetch(
        "http://127.0.0.1:8000/api/v1/images-phone-cases?" + params, {cache: "no-store"}
    )
    resp = await resp.json()
    return resp
}


export async function PhoneCaseList({page = 1, tags = [], case_id = undefined}) {
    const cases = await fetchImagePhoneCases(page, tags || [], case_id)

    return (
        <div className="w-full">
            <div className="grid p-5 grid-cols-4 gap-5 w-full">
                {
                    cases.results.map(c => (
                        <Link key={c.id} href={`/cases/${c.id}`}>
                            <PhoneCase {...c}/>
                        </Link>
                    ))
                }
            </div>
            <div className="flex justify-center pb-5 pt-2">
                <PhoneCasePagination page={page} total={cases.pagination.total_pages}/>
            </div>
        </div>
    )
}


export function PhoneCase({thumbnail, tags, image_description, phone_case}) {
    return (
        <div className="bg-white shadow-lg p-2 rounded-lg border cursor-pointer">
            <div className="relative flex justify-center">
                <img className="w-52" alt={image_description} src={thumbnail}/>

                <div className="transition ease-in opacity-0 hover:opacity-100 flex flex-col bg-gradient-to-t from-white justify-end absolute bottom-0 top-0 left-0 right-0">
                    <div className="py-4 flex flex-col items-center bg-white">
                        <button
                            className="bg-cyan-500 shadow px-3 rounded-full py-1 text-white text-sm active:bg-cyan-600"
                        >
                            Añadir al carrito
                        </button>
                        <button
                            className="mt-2 bg-green-600 shadow px-3 rounded-full py-1 text-white text-sm active:bg-green-700"
                        >
                            Personalizar
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-2">
                <p className="text-lg font-semibold truncate ...">{image_description}</p>
                <p className="text-md text-gray-500">${makeReadable(phone_case.sale_price)}</p>
                <p className="text-sm text-gray-500 truncate ...">{tags.join(", ")}</p>
            </div>
        </div>
    )
}