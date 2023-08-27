import {LeftMenu} from "@/components/phone-case-editor/LeftMenu";
import {Stage} from "react-konva";
import {ImagesLayer} from "@/components/phone-case-editor/ImagesLayer";
import {RightMenu} from "@/components/phone-case-editor/RightMenu";
import {PhoneCaseProvider} from "@/components/phone-case-editor/redux/provider";

interface PhoneCaseEditorProps {
    phoneCaseScaffoldUrl: string
}

export function PhoneCaseEditor({phoneCaseScaffoldUrl}: PhoneCaseEditorProps) {
    return (
        <PhoneCaseProvider>
            <div className="flex border-2 border-cyan-500 shadow-md rounded shadow-cyan-700">
                <div>
                    <LeftMenu />
                </div>
                <div className="border-l-2 border-r-2 border-gray-200 bg-gray-100">
                    <Stage
                        width={450}
                        height={700}
                    >
                        <ImagesLayer foregroundImgUrl={phoneCaseScaffoldUrl}/>
                    </Stage>
                </div>
                <div className="w-80">
                    <RightMenu />
                </div>
            </div>
        </PhoneCaseProvider>
    )
}
