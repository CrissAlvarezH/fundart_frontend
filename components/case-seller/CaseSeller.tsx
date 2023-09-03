import {PhoneCaseRefAndTypeSelector} from "@/components/case-seller/PhoneCaseRefAndTypeSelector";
import {AddToCartButton} from "@/components/case-seller/AddToCartButton";
import {Spacer} from "@nextui-org/spacer";
import {makeReadable} from "@/utils/money";
import {ImagePhoneCase} from "@/components/cart/redux/types";


export async function CaseSeller({imagePhoneCase}: {imagePhoneCase: ImagePhoneCase}) {

    return (
        <div className="flex bg-white p-5">
            <div className="">
                <img className="w-72" src={imagePhoneCase.image_preview}/>
            </div>

            <div className="border-2 rounded-lg p-5">
                <h1 className="text-xl font-bold pb-2">{imagePhoneCase.image_description}</h1>

                {imagePhoneCase.phone_case.discount ? (
                    <div>
                        <p className="text-lg text-gray-400 line-through">${makeReadable(imagePhoneCase.phone_case.price)}</p>
                        <div className="flex">
                            <p className="text-3xl text-gray-500 pr-1">${makeReadable(imagePhoneCase.phone_case.sale_price)}</p>
                            {imagePhoneCase.phone_case.discount.name && <p className="font-semibold text-green-600">{imagePhoneCase.phone_case.discount.rate} % OFF</p>}
                        </div>
                        <p className="text-sm text-green-600">Descuento de: {imagePhoneCase.phone_case.discount.name}</p>
                    </div>
                ) : (
                    <p className="text-3xl text-gray-500">${imagePhoneCase.phone_case.sale_price}</p>
                )}

                <Spacer y={5}/>

                <PhoneCaseRefAndTypeSelector case_id={imagePhoneCase.id} image_id={imagePhoneCase.image}/>

                <Spacer y={6}/>

                <AddToCartButton imagePhoneCase={imagePhoneCase} />
            </div>
        </div>
    )
}