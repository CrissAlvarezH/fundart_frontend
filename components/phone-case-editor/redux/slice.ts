import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {createRef, RefObject} from "react";
import {ImageShape} from "@/components/phone-case-editor/ImageShape";

export type ImageId = number

export interface Image {
    id: ImageId
    src: string
    name: string
    width: number
    height: number
    source: "img" | "sticker";
}

export interface ImageOnStage extends Image{
    x: number
    y: number
    rotation: number
    order: number
}

export type Gallery = {[key: ImageId]: Image}

export interface ImagesState {
    gallery: Gallery
    onStage: ImageOnStage[]
    imgSelectedIndex: number | null
}

export interface ImageSelected {
    index: number
    ref: RefObject<any>
}

const initialState: ImagesState = {
    gallery: {},
    onStage: [],
    imgSelectedIndex: null
}

export const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addImgToGallery: (state, action: PayloadAction<Image>) => {
            // calculate last id
            let lastId = 0
            if (Object.keys(state.gallery).length > 0) {
                lastId = (
                    Object.keys(state.gallery)
                        .map(e => Number.parseInt(e))
                        .sort((a: number, b: number) => a > b ? -1 : 1)[0]
                )
            }
            lastId += 1

            state.gallery[lastId] = {...action.payload, id: lastId}
        },
        removeImgFromGallery: (state, action: PayloadAction<ImageId>) => {
            delete state.gallery[action.payload]
            if (state.onStage[action.payload]) delete state.onStage[action.payload]
        },
        addImgToStage: (state, action: PayloadAction<ImageId>) => {
            const lastOrder = (
                state.onStage.length > 0 ? state.onStage[state.onStage.length - 1].order : 0
            )

            const img = state.gallery[action.payload]
            const aspectRatio = img.width / img.height

            state.onStage.push({
                ...img,
                order: lastOrder + 1,
                x: 10, y: 20,
                width: 200, height: 200 / aspectRatio,
                rotation: 0
            })
        },
        changeImgOnStage: (state, action: PayloadAction<{index: number, img: ImageOnStage}>) => {
            const img = state.onStage[action.payload.index]
            state.onStage[action.payload.index] = {...img, ...action.payload.img}
        },
        removeImgFromStageById: (state, action: PayloadAction<ImageId>) => {
            const newImgs = state.onStage.filter(img => img.id != action.payload)
            // reset order number to delete the numbers missing after the previous deleted
            state.onStage = newImgs.map((img, i) => ({...img, order: (i + 1)}))
        },
        removeImgFromStageByIndex: (state, action: PayloadAction<number>) => {
            state.imgSelectedIndex = null
            state.onStage.splice(action.payload, 1)
        },
        selectImgOnStage: (state, action: PayloadAction<number>) => {
            state.imgSelectedIndex = action.payload
        },
        unselectImgOnStage: (state) => {
            state.imgSelectedIndex = null
        },
        moveImgForward: (state, action: PayloadAction<number>) => {
            if (state.onStage[action.payload].order >= state.onStage.length) return
            const newIndex = action.payload + 1
            const temp = state.onStage[newIndex]
            state.onStage[newIndex] = state.onStage[action.payload]
            state.onStage[action.payload] = temp
            state.imgSelectedIndex = newIndex
            // reset order number to delete the numbers missing after the previous deleted
            state.onStage = state.onStage.map((img, i) => ({...img, order: (i + 1)}))
        },
        moveImgBackward: (state, action: PayloadAction<number>) => {
            if (state.onStage[action.payload].order <= 1) return
            const newIndex = action.payload - 1
            const temp = state.onStage[newIndex]
            state.onStage[newIndex] = state.onStage[action.payload]
            state.onStage[action.payload] = temp
            state.imgSelectedIndex = newIndex
            // reset order number to delete the numbers missing after the previous deleted
            state.onStage = state.onStage.map((img, i) => ({...img, order: (i + 1)}))
        }
    }
})


export const {
    addImgToGallery,
    addImgToStage,
    removeImgFromStageById,
    removeImgFromStageByIndex,
    removeImgFromGallery,
    changeImgOnStage,
    selectImgOnStage,
    unselectImgOnStage,
    moveImgForward,
    moveImgBackward
} = imageSlice.actions

export default imageSlice.reducer
