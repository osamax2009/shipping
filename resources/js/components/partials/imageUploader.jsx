import { useRef } from "react";
import { useState } from "react";

const ImageUploader = ({ images, setImages, oldImagePath}) => {
    const [imageURLS, setImageURLS] = useState([]);
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.click();
    };

    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImages([event.target.files[0]]);
            setImageURLS((urlList) => [
                ...urlList,
                URL.createObjectURL(event.target.files[0]),
            ]);
        }
    };
    return (
        <div className="form-group ">
            <div className="flex gap-4 items-center py-8 font-bold">
                <div>Image</div>
                <button
                    onClick={handleFocus}
                    className="py-2 px-4 text-lg rounded-lg bg-gray-300 font-bold text-gray-400"
                >
                    Select image
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
                { imageURLS[0] ? (
                    <img
                        className="border border-white w-64 h-64 outline-none"
                        src={imageURLS[0]}
                    />
                ) : oldImagePath != "" ? (
                    <img
                        className="border border-white w-64 h-64 outline-none"
                        src={oldImagePath}
                    />
                ) : <div className="py-8"></div> }
            </div>
        </div>
    );
};

export default ImageUploader