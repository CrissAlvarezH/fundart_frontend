import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "@/components/phone-case-editor/redux/store";
import {BottomIcon, DeleteIcon, ImagesIcon, TopIcon} from "@/components/phone-case-editor/Icons";
import {moveImgBackward, moveImgForward, removeImgFromStageByIndex} from "@/components/phone-case-editor/redux/slice";


export function LeftMenu() {
    const images = useSelector((state: RootStore) => state.images.onStage)
    const selectedIndex = useSelector((state: RootStore) => state.images.imgSelectedIndex)
    const dispatch = useDispatch()
    const isSelected = selectedIndex != null

    const boxStyle = isSelected ? "" : " fill-gray-500 "
    const buttonStyle = isSelected ? " hover:bg-gray-400/20" : ""

    return (
        <div className={"flex flex-col gap-2 px-2 py-2" + boxStyle }>
            <button
                onClick={() => isSelected && dispatch(removeImgFromStageByIndex(selectedIndex))}
                className={"p-2 rounded-full " + buttonStyle}>
                <DeleteIcon  w={20} h={20}/>
            </button>

            <button
                onClick={() => isSelected && dispatch(moveImgForward(selectedIndex))}
                className={"p-2 rounded-full " + buttonStyle}>
                <TopIcon w={20} h={20}/>
            </button>

            <button
                onClick={() => isSelected && dispatch(moveImgBackward(selectedIndex))}
                className={"p-2 rounded-full " + buttonStyle}>
                <BottomIcon w={20} h={20}/>
            </button>
        </div>
    )
}

