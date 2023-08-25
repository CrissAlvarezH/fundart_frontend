import {CaseSeller} from "@/components/case-seller/CaseSeller";

export default async function CasePage({params: {id}}: {params: {id: string}}) {

    return (
        <div className="flex justify-center pt-10">
            <CaseSeller id={id} />
        </div>
    )
}