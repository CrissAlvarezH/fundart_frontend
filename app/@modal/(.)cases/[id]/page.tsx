import Modal from "@/components/Modal";


async function fetchImagePhoneCase(id: string) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/${id}`, {cache: "no-cache"})
    resp = await resp.json()
    return resp
}

export default async function CaseModal({params: {id}}: {params: {id: string}}) {
    const phoneCase = await fetchImagePhoneCase(id)

    console.log("case:", phoneCase)
    return (
        <Modal>
            <div className="p-10 bg-white rounded">
                <div className="flex">
                    <div className="border border-red-500">
                        <img className="w-72" src={phoneCase.image_preview}/>
                    </div>

                    <div className="border-2 rounded-lg p-5">
                        <h1 className="text-xl font-bold">{phoneCase.image_description}</h1>
                        <p className="text-3xl">${phoneCase.phone_case.sale_price}</p>

                    </div>
                </div>
            </div>
        </Modal>
    )
}