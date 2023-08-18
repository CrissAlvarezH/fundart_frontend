
async function fetchImagePhoneCase(id: string) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/${id}`, {cache: "no-store"})
    resp = await resp.json()
    return resp
}

async function fetchPhoneCasesSummary(image_id: number) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/summary/${image_id}`, {cache: "no-store"})
    resp = await resp.json()
    return resp
}

export default async function CasePage({params: {id}}: {params: {id: string}}) {
    const phoneCase = await fetchImagePhoneCase(id)
    const phoneCaseSummary = await fetchPhoneCasesSummary(phoneCase.image)

    return (
        <div className="flex justify-center pt-10">
            <div className="flex">
                <div className="">
                    <img className="w-72" src={phoneCase.image_preview}/>
                </div>

                <div className="border-2 rounded-lg p-5">
                    <h1 className="text-xl font-bold pb-2">{phoneCase.image_description}</h1>

                    {phoneCase.phone_case.discount ? (
                        <div>
                            <p className="text-lg text-gray-400 line-through">${phoneCase.phone_case.price}</p>
                            <div className="flex">
                                <p className="text-3xl text-gray-500 pr-1">${phoneCase.phone_case.sale_price}</p>
                                {phoneCase.phone_case.discount.name && <p className="font-semibold text-green-600">{phoneCase.phone_case.discount.rate} % OFF</p>}
                            </div>
                            <p className="text-sm text-green-600">Descuento de: {phoneCase.phone_case.discount.name}</p>
                        </div>
                    ) : (
                        <p className="text-3xl text-gray-500">${phoneCase.phone_case.sale_price}</p>
                    )}

                    <div>
                        <div className="flex items-center">
                            <label
                                htmlFor="brands"
                                className="mr-2 text-gray-900"
                            >
                                Marca
                            </label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}