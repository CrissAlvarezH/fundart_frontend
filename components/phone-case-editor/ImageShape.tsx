import useImage from "use-image";
import {Image, Transformer} from "react-konva";
import {ImageId, ImageOnStage} from "@/components/phone-case-editor/redux/slice";
import {Ref, RefObject, useEffect, useRef, useState} from "react";


export interface ImageShapeProps {
    image: ImageOnStage
    trRef: RefObject<any>
    isSelected: boolean
    onSelect: () => void
    onChange: (image: ImageOnStage) => void
}

export function ImageShape({image, trRef, isSelected, onSelect, onChange}: ImageShapeProps) {
    const [img, status] = useImage(image.src)

    const ref = useRef<any>()

    useEffect(() => {
        if (!isSelected) return
        if (!ref.current) return
        trRef?.current?.nodes([ref.current]);
        trRef?.current?.getLayer().batchDraw();
    }, [isSelected, ref.current])

    if (status != "loaded") return <></>
    return (
        <>
            <Image
                onClick={() => onSelect()}
                onTap={() => onSelect()}
                ref={ref}
                draggable={isSelected}
                onDragEnd={(e) => {
                    onChange({
                        ...image,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                x={image.x}
                y={image.y}
                rotation={image.rotation}
                width={image.width}
                height={image.height}
                image={img}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = ref.current
                    if (!node) {
                        console.error("node null on image.ref.current")
                        return
                    }
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...image,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
        </>
    )
}


export function SimpleImage({src, width, ...props}: {src: string, width?: number}) {
    const [img, status] = useImage(src)
    const [height, setHeight] = useState<number>()
    const [finalWidth, setWidth] = useState<number>()

    useEffect(() => {
        if (status != "loaded") return
        if (img == null) return

        const aspectRatio = img?.width / img?.height
        const w = width || img.width
        const h = w / aspectRatio

        setHeight(h)
        setWidth(w)
    }, [status])

    console.log("w", width, "h", height)
    if (!height) return
    return (
        <Image
            image={img}
            {...props}
            width={finalWidth}
            height={height}
        />
    )
}