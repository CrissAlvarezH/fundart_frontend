import {PhoneCaseSelects} from "@/components/header/PhoneCaseSelects";

async function getPhoneCaseSummary() {
    let resp = await fetch("http://127.0.0.1:8000/api/v1/phone-cases/summary", {cache: "no-store"})
    resp = await resp.json()
    return resp
}

export async function PhoneCaseTypeSelector() {
    const summary = await getPhoneCaseSummary()
    console.log("summary", summary)

    return (
        <>
            <PhoneCaseSelects summary={summary}/>
        </>
    )
}