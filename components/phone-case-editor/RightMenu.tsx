import {ChangeEvent, Children, cloneElement, ReactElement, useRef, useState} from "react";
import {
    ArrowDropIcon,
    ArrowUpIcon,
    CloseIcon, CloseSoloIcon,
    ImagesIcon,
    LayersIcon,
    StickersIcon
} from "@/components/phone-case-editor/Icons";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "@/components/phone-case-editor/redux/store";
import {
    addImgToGallery,
    addImgToStage,
    Gallery,
    Image as DataImage, ImageOnStage, moveImgBackward, moveImgForward, removeImgFromStageByIndex, selectImgOnStage
} from "@/components/phone-case-editor/redux/slice";

export function RightMenu() {
    const images = useSelector((state: RootStore) => state.images.gallery)
    const onStage = useSelector((state: RootStore) => state.images.onStage)
    const imgSelectedIndex = useSelector((state: RootStore) => state.images.imgSelectedIndex)
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = useState<string>("images")

    let content = null
    if (selectedTab == "images") {
        content = (
            <ImagesContent
                images={images}
                onAdd={(img: DataImage) => dispatch(addImgToGallery(img))}
                onClick={(img: DataImage) => dispatch(addImgToStage(img.id))}
            />
        )
    } else if (selectedTab == "stickers") {
        content = (
            <StickersContent />
        )
    } else if (selectedTab == "layers") {
        content = (
            <LayersContent
                imagesOnStage={onStage}
                selectedIndex={imgSelectedIndex}
                onImgForward={i => dispatch(moveImgForward(i))}
                onImgBackward={i => dispatch(moveImgBackward(i))}
                onRemove={i => dispatch(removeImgFromStageByIndex(i))}
                onSelect={i => dispatch(selectImgOnStage(i))}
            />
        )
    }
    return (
        <div className="">
            <div className="flex bg-cyan-500 w-full">
                <Tabs selected={selectedTab} setSelected={setSelectedTab}/>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

interface ImagesContentProps {
    images: Gallery
    onAdd: (img: DataImage) => void
    onClick: (img: DataImage) => void
}

function ImagesContent({images, onAdd, onClick}: ImagesContentProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imgUrl = URL.createObjectURL(event.target.files[0])
            const fr = new FileReader;
            fr.onload = function() { // file is loaded
                const img = new Image;

                img.onload = function() {
                    const newImage = {
                        id: 0,
                        name: "images added",
                        src: imgUrl,
                        width: img.width,
                        height: img.height,
                        source: "img"
                    }
                    onAdd(newImage)
                };

                img.src = fr.result as string; // is the data URL because called with readAsDataURL
            };
            fr.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <div className="p-2">
            <div className="pt-3 pb-5 flex justify-center">
                <button
                    className="hover:bg-gray-400/10 active:bg-gray-400/20 rounded-full text-gray-500 border-2 px-4 py-1 border-gray-400"
                    onClick={() => fileInputRef?.current?.click()}
                    >
                    Subir imagen
                </button>
                <input ref={fileInputRef} type="file" onChange={onImageChange} className="hidden" />
            </div>
            <div>
                <div className="grid gap-1 grid-cols-2">
                    {
                        Object.values(images).map((img: DataImage) => (
                            <PickedImage onClick={() => onClick(img)} src={img.src} key={img.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function PickedImage({src, onClick}: {src: string, onClick: () => void}) {
    return (
        <div
            className="relative border-2 rounded-lg hover:cursor-pointer"
            onClick={() => onClick()}
        >
            <img className="object-cover rounded-lg w-full h-40" src={src}  alt="img added"/>

            <div className="absolute top-0 right-0 rounded-full p-1 hover:fill-white hover:bg-black/40">
                <CloseIcon  w={20} h={20}/>
            </div>
        </div>

    )
}


function StickersContent() {
    return (
        <div className="flex justify-center p-3">
            <div className="flex flex-col items-center">
                <h1 className="pt-3">Stickers</h1>
                <p className="text-sm font-semibold text-gray-400 pt-5">Actualmente no hay stickers disponibles</p>
            </div>
        </div>
    )
}

interface LayersContentProps {
    imagesOnStage: ImageOnStage[]
    selectedIndex: number | null
    onImgForward: (i: number) => void
    onImgBackward: (i: number) => void
    onRemove: (i: number) => void
    onSelect: (i: number) => void
}

function LayersContent({imagesOnStage, selectedIndex, onSelect, onImgForward, onImgBackward, onRemove}: LayersContentProps) {
    return (
        <div>
            {
                // order in the other way but keep the original i for the functions
                imagesOnStage
                    .map((img: ImageOnStage, i: number) => ({img, i}))
                    .sort((a, b) => a.i > b.i ? -1 : 1)
                    .map(({img, i}) => (
                    <div
                        className="flex flex-col"
                        key={i}>
                        <div
                            className={"flex p-2 justify-between items-center " + (selectedIndex == i && " bg-blue-400/20") }>
                            <img
                                onClick={() => onSelect(i)}
                                className="object-cover h-10 w-10 hover:cursor-pointer rounded"
                                src={img.src} alt={"image " + img.id}/>
                            <div className="fill-gray-600 flex justify-center items-center">
                                <button
                                    onClick={() => onImgForward(i)}
                                    className="hover:bg-gray-400/20 active:bg-gray-400/30 rounded-full"
                                >
                                    <ArrowUpIcon />
                                </button>
                                <button
                                    onClick={() => onImgBackward(i)}
                                    className="hover:bg-gray-400/20 active:bg-gray-400/30 rounded-full"
                                >
                                    <ArrowDropIcon />
                                </button>
                                <button
                                    onClick={() => onRemove(i)}
                                    className="p-1 hover:bg-gray-400/20 active:bg-gray-400/30 rounded-full"
                                >
                                    <CloseSoloIcon />
                                </button>
                            </div>
                        </div>

                        <div className="h-[1px] bg-gray-300 mx-2"></div>
                    </div>
                ))
            }
        </div>
    )
}


function Tabs({selected, setSelected}: {selected: string, setSelected: (name: string) => void}) {

    return (
        <div className="flex bg-cyan-500 w-full">
            <Tab name="images" selected={selected} onSelect={setSelected}><ImagesIcon /></Tab>
            <Tab name="stickers" selected={selected} onSelect={setSelected}><StickersIcon /></Tab>
            <Tab name="layers" selected={selected} onSelect={setSelected}><LayersIcon /></Tab>
        </div>
    )
}


interface TabProps {
    name: "images" | "stickers" | "layers"
    selected: string | undefined
    onSelect: (name: string) => void
    children: ReactElement
}

function Tab({children, name, selected, onSelect}: TabProps) {
    const isSelected = selected == name

    const childrenWithProps = Children.map(children, (child: any) => {
        return cloneElement(child,  {fill: isSelected ? "#06b6d4" : "white"})
    })
    return (
        <div
            className={"flex-1 flex justify-center p-2" + (isSelected ? " bg-white" : " hover:bg-black/10")}
            onClick={() => onSelect(name)}
        >
            {childrenWithProps}
        </div>
    )
}

