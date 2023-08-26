import {PhoneSelects} from "@/components/case-seller/PhoneSelects";


async function fetchImageSummary(image_id: string) {
    let resp = await fetch(
        `http://127.0.0.1:8000/api/v1/images-phone-cases/image-summary/${image_id}`,
        {cache: "no-store"}
    )
    resp = await resp.json()
    return resp
}

function getBrandRefAndCaseType(summary, case_id) {
    for (let m of Object.keys(summary)) {
        for (let ref of Object.keys(summary[m])) {
            for (let ct of Object.keys(summary[m][ref])) {
                const caseObj = summary[m][ref][ct]
                if (caseObj.id == case_id) {
                    return {
                        brand: caseObj.phone_case.phone_brand_ref.brand,
                        ref: caseObj.phone_case.phone_brand_ref.name,
                        case_type: caseObj.phone_case.case_type
                    }
                }
            }
        }
    }

    return {brand: null, ref: null, case_type: null}
}

export async function PhoneCaseRefAndTypeSelector({case_id, image_id}: {case_id: string, image_id: string}) {
    const summary = await fetchImageSummary(image_id)
    const defaultSelectValues = getBrandRefAndCaseType(summary, case_id)


    return (
        <div className="w-full">
            <PhoneSelects defaults={defaultSelectValues} summary={summary}/>
        </div>
    )
}