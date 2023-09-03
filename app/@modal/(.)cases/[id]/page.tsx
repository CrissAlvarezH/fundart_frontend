import Modal from "@/components/Modal";
import {CaseSeller} from "@/components/case-seller/CaseSeller";
import {ImagePhoneCase} from "@/components/cart/redux/types";


async function fetchImagePhoneCase(id: string) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/${id}`, {cache: "no-cache"})
    return await resp.json() as ImagePhoneCase
}

export default async function CaseModal({params: {id}}: {params: {id: string}}) {
    const phoneCase = await fetchImagePhoneCase(id)

    return (
        <Modal>
            <CaseSeller imagePhoneCase={phoneCase}/>
        </Modal>
    )
}