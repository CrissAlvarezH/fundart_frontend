"use client";
import {CartIcon, UserIcon} from "@/components/Icons";
import {PhoneCaseTypeSelector} from "@/components/header/PhoneCaseTypeSelector";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {CartStore} from "@/components/cart/redux/store";
import {Chip} from "@nextui-org/chip";

export function HeaderContent() {
    const pathname = usePathname()
    const cart = useSelector((state: CartStore) => state.cart.cart)

    return (
        <div className="flex justify-center shadow-lg bg-white z-50">
            <div className="flex justify-start items-center container mx-10">
                <div className="mr-10">
                    <h1 className="font-semibold">Fundart</h1>
                </div>

                <div className="flex justify-between w-full">

                    <div className="flex">
                        <div className="p-3 text-gray-600 cursor-pointer hover:text-black hover:bg-gray-400/10 active:bg-gray-400/20">
                            Tienda
                        </div>
                        <div className="p-3 text-gray-600 cursor-pointer hover:text-black hover:bg-gray-400/10 active:bg-gray-400/20">
                            Imagenes
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-1">
                        {pathname == "/" && (
                            <div className="pr-2">
                                <PhoneCaseTypeSelector />
                            </div>
                        )}
                        <div>
                            <UserIcon className="w-10 h-10 p-2 rounded-full cursor-pointer active:bg-gray-400/20 hover:bg-gray-400/10"/>
                        </div>
                        <div className="relative">
                            {Object.keys(cart).length > 0 && (
                                <Chip size="sm" color="primary" className="absolute top-0 right-0">
                                    {String(Object.keys(cart).length)}
                                </Chip>
                            )}
                            <CartIcon className="w-10 h-10 p-2 rounded-full cursor-pointer active:bg-gray-400/20 hover:bg-gray-400/10"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
