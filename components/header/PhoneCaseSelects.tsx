"use client";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Button} from "@nextui-org/button";
import {Tooltip} from "@nextui-org/tooltip";


export function PhoneCaseSelects({summary}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const onSelectBrand = useCallback(
        (brand: string) => {
            const params = new URLSearchParams(searchParams)
            if (params.get("brand") == brand ) return params.toString()
            params.delete("ref")
            params.delete("type")

            params.set("brand", brand)

            console.log("brand", params.toString())
            router.replace(pathname + "?" + params.toString())
        },
        [searchParams]
    )

    const onSelectRef = useCallback(
        (ref: string) => {
            const params = new URLSearchParams(searchParams)
            if (params.get("ref") == ref) return params.toString()
            params.delete("type")

            params.set("ref", ref)
            router.replace(pathname + "?" + params.toString())
        },
        [searchParams]
    )

    const onSelectCaseType = useCallback(
        (caseType: string, caseId: number) => {
            const params = new URLSearchParams(searchParams)
            if (params.get("type") == caseType) return params.toString()

            params.set("type", caseType)
            params.set("case_id", String(caseId))
            router.replace(pathname + "?" + params.toString())
        },
        [searchParams]
    )
    const selectedBrand = searchParams.get("brand")
    const selectedRef = searchParams.get("ref")
    const selectedCaseType = searchParams.get("type")

    return (
        <PopoverInfo>
            <div className="flex border-2 rounded-full shadow bg-black text-white">

                <Dropdown>
                    <DropdownTrigger>
                        {selectedBrand ? (
                            <p className="font-semibold hover:bg-white/20 active:bg-white/25 cursor-pointer py-2 px-6">
                                {selectedBrand}
                            </p>
                        ) : (
                            <p className="font-semibold rounded-l-full bg-gray-500 hover:bg-gray-600 active:bg-gray-700 cursor-pointer py-2 px-6">
                                Marca...
                            </p>
                        )}
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Select brand"
                        onAction={key => onSelectBrand(String(key))}
                    >
                        {Object.keys(summary).map(k => (
                            <DropdownItem key={k}>{k}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <div className="border border-white/50"></div>

                <Dropdown>
                    <DropdownTrigger>
                        {selectedRef ? (
                            <p className="font-semibold hover:bg-white/20 active:bg-white/25 cursor-pointer py-2 px-6">
                                {selectedRef}
                            </p>
                        ) : (
                            selectedBrand != null ? (
                                <p className="font-semibold bg-gray-500 hover:bg-gray-600 active:bg-gray-700 cursor-pointer py-2 px-6">
                                    Referencia...
                                </p>
                            ): (
                                <div>
                                    <Tooltip color="secondary" content="Debes seleccionar la marca">
                                        <p className="font-semibold bg-gray-500 hover:bg-gray-600 active:bg-gray-700 cursor-pointer py-2 px-6">
                                            Referencia...
                                        </p>
                                    </Tooltip>
                                </div>
                            )
                        )}
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Select ref"
                        onAction={key => onSelectRef(String(key))}
                    >
                        {selectedBrand !== null ? Object.keys(summary[selectedBrand]).map(ref => (
                            <DropdownItem key={ref}>{ref}</DropdownItem>
                        )) : <></>}
                    </DropdownMenu>
                </Dropdown>

                <div className="border border-white/50"></div>

                <Dropdown>
                    <DropdownTrigger>
                        {selectedCaseType ? (
                            <p className="font-semibold hover:bg-white/20 active:bg-white/25 cursor-pointer py-2 pr-6 pl-5">
                                {selectedCaseType}
                            </p>
                        ) : (
                            selectedRef != null ? (
                                <p className="font-semibold bg-gray-500 rounded-r-full hover:bg-gray-600 active:bg-gray-700 cursor-pointer py-2 pr-6 pl-5">
                                    Tipo...
                                </p>
                            ): (
                                <div>
                                    <Tooltip color="secondary" content="Debes seleccionar la referencia">
                                        <p className="font-semibold bg-gray-500 rounded-r-full hover:bg-gray-600 active:bg-gray-700 cursor-pointer py-2 pr-6 pl-5">
                                            Tipo...
                                        </p>
                                    </Tooltip>
                                </div>
                            )
                        )}
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Select case type"
                        onAction={key => onSelectCaseType(String(key), summary[selectedBrand][selectedRef][String(key)].id)}
                    >
                        {selectedBrand !== null && selectedRef !== null ? (
                            Object.keys(summary[selectedBrand][selectedRef]).map(t => (
                                <DropdownItem key={t}>{t}</DropdownItem>
                            ))
                        ) : <></>}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </PopoverInfo>
    )
}


function PopoverInfo({children}) {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <Popover showArrow backdrop="opaque" placement="bottom" isOpen={isOpen}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="px-2 py-5">
                    <p className="text-lg font-semibold">Selecciona tu marca de celular y el tipo de case que prefieres</p>
                    <div className="pt-4 flex justify-end">

                        <Button color="primary" onClick={() => setIsOpen(false)}>OK</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}