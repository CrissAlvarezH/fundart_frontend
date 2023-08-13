import Modal from "@/components/Modal";


async function fetchImagePhoneCase(id: string) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/${id}`)
    resp = await resp.json()
    return resp
}

export default async function CaseModal({params: {id}}: {params: {id: string}}) {
    const phoneCase = await fetchImagePhoneCase(id)

    console.log("case:", phoneCase)
    return (
        <Modal>
            <div className="p-10 bg-white rounded">
                <h1>Case Modal: {id}</h1>
            </div>
        </Modal>
    )
}