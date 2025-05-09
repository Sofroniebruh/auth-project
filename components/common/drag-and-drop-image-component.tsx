import {DropzoneInputProps, DropzoneRootProps} from "react-dropzone";

interface Props {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T,
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T,
    isDragActive: boolean,
}

export const DragAndDropImageComponent = ({getRootProps, getInputProps, isDragActive}: Props) => {
    return (
        <div
            className={"h-[300px] bg-gray-200 flex flex-1 justify-center items-center p-5 rounded-md"} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p className={"text-center font-semibold"}>Drop the image here ...</p> :
                    <p className={"text-center font-semibold"}>Drag your image here, or click to select</p>
            }
        </div>
    )
}