import {CaseSeller} from "@/components/case-seller/CaseSeller";
import {ImagePhoneCase} from "@/components/cart/redux/types";
import {CartProvider} from "@/components/cart/redux/provider";

async function fetchImagePhoneCase(id: string) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/${id}`, {cache: "no-store"})
    return await resp.json() as ImagePhoneCase
}

export default async function CasePage({params: {id}}: {params: {id: string}}) {
    const phoneCase = await fetchImagePhoneCase(id)

    return (
        <div className="flex justify-center pt-10">
            <CartProvider>
                <CaseSeller imagePhoneCase={phoneCase}/>
            </CartProvider>
        </div>
    )
}