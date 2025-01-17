"use client"
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";

const FileInput = ({ param, handleChange }: { param: any, handleChange: any }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef: any = useRef<LegacyRef<HTMLInputElement>>()
    const { type, id, title, required, min, max, default_value } = param;

    useEffect(() => {
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                if (!reader.result) return;
                const base64Image = reader.result?.split(',')[1]; // Get base64 string without the data URL prefix
                console.log(base64Image);
                handleChange(id, base64Image);
                setPreview(reader.result); // Set the preview image
            };

            reader.readAsDataURL(file);
        }
    }, [file]);

    return (
        <div>
            <div className="flex flex-wrap gap-5 justify-between content-center mt-5 w-full max-md:max-w-full">
                <div className="flex gap-2 justify-between whitespace-nowrap">
                    <CiImageOn className="w-4 h-4" />
                    <div className='text-md'>{title}</div>
                    <div className="my-auto text-sm leading-5 ms-2  text-zinc-500">
                        file
                    </div>
                </div>
                <div className="my-auto text-sm leading-5 text-zinc-500">
                    Required
                </div>
            </div>
            <div className="flex gap-4 justify-between mt-2 text-base leading-6 text-stone-500 whitespace-nowrap max-md:flex-wrap">
                <button
                    type='button'
                    onClick={(e) => inputRef?.current.click()}
                    className="w-full justify-center p-2 rounded cursor-pointer bg-transparent border border-gray-700 border-solid"
                >
                    {file ? `Selected file: ${file?.name}` : "Choose Image"}
                </button>
                <input
                    id={id}
                    min={min}
                    max={max}
                    type="file"
                    ref={inputRef}
                    onChange={(e: any) => setFile(e?.target?.files[0])}
                    className="hidden"
                    accept="image/*"
                />
            </div>
            {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Selected" className="max-w-full h-auto" />
                </div>
            )}
        </div>
    )
}

export default FileInput