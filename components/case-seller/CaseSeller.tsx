import {Button} from "@nextui-org/button";
import {PhoneCaseRefAndTypeSelector} from "@/components/case-seller/PhoneCaseRefAndTypeSelector";
import {AddToCartButton} from "@/components/case-seller/AddToCartButton";
import {Spacer} from "@nextui-org/spacer";
import {makeReadable} from "@/utils/money";

async function fetchImagePhoneCase(id: string) {
    let resp = await fetch(`http://127.0.0.1:8000/api/v1/images-phone-cases/${id}`, {cache: "no-store"})
    resp = await resp.json()
    return resp
}

export async function CaseSeller({id}: {id: string}) {
    const phoneCase = await fetchImagePhoneCase(id)

    return (
        <div className="flex">
            <div className="">
                <img className="w-72" src={phoneCase.image_preview}/>
            </div>

            <div className="border-2 rounded-lg p-5">
                <h1 className="text-xl font-bold pb-2">{phoneCase.image_description}</h1>

                {phoneCase.phone_case.discount ? (
                    <div>
                        <p className="text-lg text-gray-400 line-through">${makeReadable(phoneCase.phone_case.price)}</p>
                        <div className="flex">
                            <p className="text-3xl text-gray-500 pr-1">${makeReadable(phoneCase.phone_case.sale_price)}</p>
                            {phoneCase.phone_case.discount.name && <p className="font-semibold text-green-600">{phoneCase.phone_case.discount.rate} % OFF</p>}
                        </div>
                        <p className="text-sm text-green-600">Descuento de: {phoneCase.phone_case.discount.name}</p>
                    </div>
                ) : (
                    <p className="text-3xl text-gray-500">${phoneCase.phone_case.sale_price}</p>
                )}

                <Spacer y={5}/>

                <PhoneCaseRefAndTypeSelector case_id={id} image_id={phoneCase.image}/>

                <Spacer y={6}/>

                <AddToCartButton id={id} />
            </div>
        </div>
    )
}