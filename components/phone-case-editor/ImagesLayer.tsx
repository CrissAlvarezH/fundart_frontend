import {createRef, RefObject, useEffect, useRef, useState} from "react";
import {Image, Layer, Transformer} from "react-konva";
import {ImageShape, SimpleImage} from "@/components/phone-case-editor/ImageShape";
import {useDispatch, useSelector} from "react-redux";
import {RootStore, store} from "@/components/phone-case-editor/redux/store";
import {changeImgOnStage, ImageOnStage, imageSlice, selectImgOnStage} from "@/components/phone-case-editor/redux/slice";


interface ImagesLayerProps {
    foregroundImgUrl: string
}

export function ImagesLayer({foregroundImgUrl}: ImagesLayerProps) {
    const images = useSelector((state: RootStore) => state.images.onStage)
    const selectedIndex = useSelector((state: RootStore) => state.images.imgSelectedIndex)
    const dispatch = useDispatch()

    const trRef = useRef<any>();

    function onChangeImg(index: number, img: ImageOnStage) {
        dispatch(changeImgOnStage({index, img}))
    }

    function onSelect(index: number, ref: RefObject<any>) {
        dispatch(selectImgOnStage(index))
    }

    return (
        <>
            <Layer>
                {
                    images.map((img: ImageOnStage, i: number) => {
                        return (
                            <ImageShape
                                key={i}
                                trRef={trRef}
                                image={img}
                                isSelected={i === selectedIndex}
                                onSelect={() => dispatch(selectImgOnStage(i))}
                                onChange={img => onChangeImg(i, img)}
                            />
                        )
                    })
                }
            </Layer>

            {
                foregroundImgUrl != null && (
                    <Layer>
                        <SimpleImage
                            src={foregroundImgUrl}
                            x={0}
                            y={0}
                            width={450}
                            listening={false}
                        />
                    </Layer>
                )
            }

            {
                selectedIndex != null && (
                    <Layer>
                        <Transformer
                            ref={trRef}
                            boundBoxFunc={(oldBox, newBox) => {
                                // limit resize
                                if (newBox.width < 5 || newBox.height < 5) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                        />
                    </Layer>
                )
            }
        </>
    )
}
