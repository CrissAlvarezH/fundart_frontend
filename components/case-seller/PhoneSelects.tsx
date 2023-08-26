"use client"
import {Select, SelectItem} from "@nextui-org/select";
import {Spacer} from "@nextui-org/spacer";
import {useState} from "react";
import {decodeAction} from "next/dist/server/app-render/entry-base";
import {usePathname, useRouter} from "next/navigation";
import {pathHasPrefix} from "next/dist/shared/lib/router/utils/path-has-prefix";


export function PhoneSelects({summary, defaults}) {
    const [brand, setBrand] = useState(defaults.brand)
    const [ref, setRef] = useState(defaults.ref)
    const [caseType, setCaseType] = useState(defaults.case_type)
    const router = useRouter()

    const onBrandSelected = (brand) => {
        console.log("brand", brand)
        console.log("brand str", brand.values().next().value)
        setBrand(brand.values().next().value)
        setRef(null)
        setCaseType(null)
    }

    const onRefSelected = (ref) => {
        setRef(ref.values().next().value)
        setCaseType(null)
    }

    const onCaseTypeSelected = (caseType) => {
        const value = caseType.values().next().value
        const id = summary[brand][ref][value].id
        if (id) router.replace("/cases/" + id)
        else console.log({brand, ref, caseType, summary})
    }

    return (
        <div>
            <Select
                label="Selecciona la marca"
                className="flex w-full items-center gap-2"
                selectedKeys={brand ? new Set([brand]) : new Set()}
                onSelectionChange={onBrandSelected}
            >
                {Object.keys(summary).map(k => (
                    <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
            </Select>

            <Spacer y={2}/>

            <Select
                label="Selecciona la referencia"
                isDisabled={!brand}
                selectedKeys={brand && ref ? new Set([ref]) : new Set()}
                onSelectionChange={onRefSelected}
                className="flex w-full items-center gap-2"
            >
                {brand ? Object.keys(summary[brand]).map(ref => (
                    <SelectItem key={ref} value={ref}>{ref}</SelectItem>
                )) : <SelectItem key={1}></SelectItem>}
            </Select>

            <Spacer y={2}/>

            <Select
                label="Selecciona el tipo"
                className="flex w-full items-center gap-2"
                isDisabled={!ref}
                selectedKeys={brand && ref && caseType ? new Set([caseType]) : new Set()}
                onSelectionChange={onCaseTypeSelected}
            >
                {brand && ref ? Object.keys(summary[brand][ref]).map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                )) : <SelectItem key={1}></SelectItem>}
            </Select>

        </div>
    )
}