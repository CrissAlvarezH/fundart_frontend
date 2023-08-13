import {Header} from "@/components/Header";
import {ImageTagBudget} from "@/app/ImageTagBadge";
import {PhoneCaseList} from "@/components/PhoneCaseList";

async function fetchTags() {
    let resp = await fetch("http://127.0.0.1:8000/api/v1/tags")
    resp = await resp.json()
    return resp
}

export default async function Home({searchParams}) {
    const tags = await fetchTags()
    console.log("tags", searchParams.tags)

    return (
        <div>
            {/* TAG FILTERS */}
            <div className="bg-cyan-500 p-5 flex justify-center items-center">
                <div className="flex flex-wrap px-10 justify-center">
                    {
                        tags.map((tag) => (
                           <ImageTagBudget
                               key={tag.name}
                               tag={tag.name}
                               isSelected={searchParams.tags && searchParams.tags.split(",").includes(tag.name)}
                           />
                        ))
                    }
                </div>
            </div>

            {/* PHONE CASE LIST */}
            <div className="flex justify-center">
                <PhoneCaseList
                    page={searchParams.page || 1}
                    tags={searchParams.tags?.split(",") || []}
                />
            </div>
           {/*// TODO create pagination component */}
        </div>
    )
}
