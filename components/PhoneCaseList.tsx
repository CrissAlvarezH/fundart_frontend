

async function fetchImagePhoneCases(page = 1, tags = []) {
    let resp = await fetch(
        "http://127.0.0.1:8000/api/v1/images-phone-cases?" + new URLSearchParams({
            page: String(page), tags: tags.join(",")
        })
    )
    resp = await resp.json()
    return resp
}


export async function PhoneCaseList({page = 1, tags = []}) {
    const cases = await fetchImagePhoneCases(page, tags || [])
    console.log("cases", cases)

    return (
        <div className="grid grid-rows-3 grid-cols-4 gap-5 py-2">
            {
                cases.results.map(c => (
                    <PhoneCase {...c}/>
                ))
            }
        </div>
    )
}


export function PhoneCase({thumbnail, tags}) {
    return (
        <div className="bg-white shadow-lg p-2 rounded-lg border cursor-pointer">
            <div className="relative">
                <img className="w-52" src={thumbnail}/>

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

            <div className="flex">
                <p className="text-sm text-gray-500">{tags.join(", ")}</p>
            </div>
        </div>
    )
}