"use client"

import {Button} from "@nextui-org/button";
import {MinusIcon, PlusIcon} from "@/components/Icons";
import {Spacer} from "@nextui-org/spacer";
import {makeReadable} from "@/utils/money";
import {useState} from "react";
import Link from "next/link";

export function PhoneCaseItem({id, thumbnail, tags, image_description, phone_case}) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="bg-white shadow-lg p-2 rounded-lg border cursor-pointer">
            <div className="relative flex justify-center">
                <img className="w-52" alt={image_description} src={thumbnail}/>

                <div
                    className="transition ease-in opacity-0 hover:opacity-100 flex flex-col bg-gradient-to-t from-white absolute bottom-0 top-0 left-0 right-0"
                >
                    <div className="flex-1">
                        <Link href={`/cases/${id}`}>
                            <div className="w-full h-full"></div>
                        </Link>
                    </div>

                    <div className="py-4 flex justify-center items-center bg-white">
                        <div className="flex border border-cyan-500 rounded-full items-center">
                            <Button
                                variant="light"
                                size="sm"
                                className="rounded-full p-2"
                                isIconOnly
                                isDisabled={quantity <= 1}
                                onClick={() => setQuantity((q) => q > 1 ? q - 1 : q)}
                            >
                                <MinusIcon className="fill-cyan-600"/>
                            </Button>

                            <p className="text-cyan-600 text-sm w-5 flex justify-center">{quantity}</p>

                            <Button
                                variant="light"
                                size="sm"
                                className="rounded-full p-2"
                                isIconOnly
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                <PlusIcon className="fill-cyan-600"/>
                            </Button>
                        </div>

                        <Spacer x={1}/>

                        <Button
                            size="sm"
                            className="rounded-full bg-cyan-500 text-white"
                        >
                            Agregar al carrito
                        </Button>
                    </div>
                </div>
            </div>

            <div className="px-2">
                <p className="text-lg font-semibold truncate ...">{image_description}</p>

                {phone_case.discount ? (
                    <div>
                        <p className="text-sm text-gray-400 line-through">${makeReadable(phone_case.price)}</p>
                        <div className="flex">
                            <p className="text-xl text-gray-500 pr-1">${makeReadable(phone_case.sale_price)}</p>
                            {phone_case.discount.name && <p className="font-semibold text-green-600">{phone_case.discount.rate} % OFF</p>}
                        </div>
                    </div>
                ) : (
                    <p className="text-xl text-gray-500">${phone_case.sale_price}</p>
                )}

                <p className="text-sm text-gray-500 truncate ...">{tags.join(", ")}</p>
            </div>
        </div>
    )
}
