
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const FileUploader = ({ files, setFiles, oldFilePath}) => {
    const [filesURLS, setfilesURLS] = useState([]);
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.click();
    };

    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFiles([ event.target.files[0]]);
            setfilesURLS((urlList) => [
                ...urlList,
                URL.createObjectURL(event.target.files[0]),
            ]);
        }
    };

    return (
        <div className="form-group ">
            <div className="flex gap-4 items-center py-8 font-bold">
                <div>File</div>
                <button
                    onClick={handleFocus}
                    className="py-2 px-4 text-lg rounded-lg bg-gray-300 font-bold text-gray-400"
                >
                    Select file
                </button>
            </div>

            <input
                ref={inputRef}
                id="logo"
                type="file"
                className="w-[2px] h-[1px] fixed -z-10"
                onChange={uploadImageToClient}
            />

            <div className="flex w-full justify-center items-center">
                { filesURLS[0] ? (
                    <img
                        className="border border-white w-64 h-64 outline-none"
                        src={filesURLS[0]}
                    />
                ) : oldFilePath ? (
                    <img
                        className="border border-white w-64 h-64 outline-none"
                        src={oldFilePath}
                    />
                ): <div className="py-8"></div> }
            </div>
        </div>
    );
};

export default FileUploader