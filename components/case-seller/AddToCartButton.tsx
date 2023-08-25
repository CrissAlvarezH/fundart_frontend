"use client"
import {Button} from "@nextui-org/button";
import {useState} from "react";
import {MinusIcon, PlusIcon} from "@/components/Icons";
import {Spacer} from "@nextui-org/spacer";


export function AddToCartButton({id}: {id: string}) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="flex items-center">
            <div className="flex border border-cyan-500 rounded-full items-center">
                <Button
                    variant="light"
                    size="lg"
                    className="rounded-full p-2"
                    isIconOnly
                    isDisabled={quantity <= 1}
                    onClick={() => setQuantity((q) => q > 1 ? q - 1 : q)}
                >
                    <MinusIcon className="fill-cyan-600"/>
                </Button>

                <p className="text-cyan-600 text-lg w-10 flex justify-center">{quantity}</p>

                <Button
                    variant="light"
                    size="lg"
                    className="rounded-full p-2"
                    isIconOnly
                    onClick={() => setQuantity((q) => q + 1)}
                >
                    <PlusIcon className="fill-cyan-600"/>
                </Button>
            </div>

            <Spacer x={4}/>

            <Button
                size="lg"
                className="rounded-full bg-cyan-500 text-white"
            >
                Agregar al carrito
            </Button>
        </div>
    )
}