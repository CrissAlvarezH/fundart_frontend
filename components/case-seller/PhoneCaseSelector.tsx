"use client"

import {Select, SelectItem} from "@nextui-org/select";
import {Spacer} from "@nextui-org/spacer";


export function PhoneCaseSelector() {
    return (
        <div className="w-full">
            <Select
                label="Selecciona la marca"
                className="flex w-full items-center gap-2"
            >
                <SelectItem key="Iphone" value="Iphone">Iphone</SelectItem>
                <SelectItem key="Samsung" value="Samsung">Samsung</SelectItem>
                <SelectItem key="Xiaomi" value="Xiaomi">Xiaomi</SelectItem>
                <SelectItem key="Huawei" value="Huawei">Huawei</SelectItem>
            </Select>

            <Spacer y={2}/>

            <Select
                label="Selecciona la referencia"
                className="flex w-full items-center gap-2"
            >
                <SelectItem key="Iphone" value="Iphone">Iphone</SelectItem>
                <SelectItem key="Samsung" value="Samsung">Samsung</SelectItem>
                <SelectItem key="Xiaomi" value="Xiaomi">Xiaomi</SelectItem>
                <SelectItem key="Huawei" value="Huawei">Huawei</SelectItem>
            </Select>

            <Spacer y={2}/>

            <Select
                label="Selecciona el tipo"
                className="flex w-full items-center gap-2"
            >
                <SelectItem key="Iphone" value="Iphone">Iphone</SelectItem>
                <SelectItem key="Samsung" value="Samsung">Samsung</SelectItem>
                <SelectItem key="Xiaomi" value="Xiaomi">Xiaomi</SelectItem>
                <SelectItem key="Huawei" value="Huawei">Huawei</SelectItem>
            </Select>
        </div>
    )
}