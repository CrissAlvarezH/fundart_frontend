"use client"

import {redirect, useRouter, useSearchParams} from "next/navigation";

export function ImageTagBudget({tag, isSelected}) {
    const searchParams = useSearchParams()
    const router = useRouter()


    const style = (
        "py-2 px-3 border border-white rounded-full m-2 cursor-pointer"
        + (isSelected ? " bg-white text-black hover:bg-white/90 " : " text-white hover:bg-white/10")
    )

    const onClick = () => {
        let tags = searchParams.get("tags")?.split(",") || []
        if (isSelected) {
            tags = tags.filter(t => t != tag)
        } else {
            tags.push(tag)
        }

        if (tags.length > 0) router.push("/?tags=" + tags.join(","))
        else router.push("/")
    }

    return (
        <div
            onClick={() => onClick()}
            className={style}>
            {tag}
        </div>
    )
}