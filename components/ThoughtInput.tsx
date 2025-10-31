import React, { useState, useRef, ChangeEvent } from 'react';
import { CameraIcon, FolderIcon, SparklesIcon } from './Icons';

interface ThoughtInputProps {
    onSave: (text: string, image: string | null) => void;
    onGenerateImage: (prompt: string) => Promise<string | null>;
}

export const ThoughtInput: React.FC<ThoughtInputProps> = ({ onSave, onGenerateImage }) => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (text.trim() || imagePreview) {
            onSave(text, imagePreview);
            setText('');
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = '';
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };
    
    const handleGenerateClick = async () => {
        if (!text.trim()) {
            alert("Please enter some text to generate an image.");
            return;
        }
        setIsGeneratingImage(true);
        try {
            const imageUrl = await onGenerateImage(text);
            if (imageUrl) {
                setImagePreview(imageUrl);
            }
        } catch (error) {
            console.error("Image generation failed at input level", error);
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="bg-white rounded-lg border border-[#EDE6DB] shadow-sm p-4">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder="What are you thinking?"
                className="w-full resize-none border-none focus:ring-0 p-0 text-base placeholder-[#A9A299] bg-transparent"
                rows={1}
            />
            {imagePreview && (
                <div className="mt-4 relative">
                    <img src={imagePreview} alt="Preview" className="max-h-60 rounded-lg" />
                    <button
                        onClick={() => {
                            setImagePreview(null);
                            if(fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-full hover:bg-[#F7F2EB] text-[#8D8478] hover:text-[#5A524A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label="Add image"
                    >
                        <CameraIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={handleGenerateClick}
                        disabled={isGeneratingImage || !text.trim()}
                        className="p-2 rounded-full hover:bg-[#F7F2EB] text-[#8D8478] hover:text-[#5A524A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Generate image with AI"
                    >
                        {isGeneratingImage ? (
                            <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <SparklesIcon className="w-5 h-5" />
                        )}
                    </button>
                    <button className="p-2 rounded-full hover:bg-[#F7F2EB] text-[#8D8478] hover:text-[#5A524A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Add file">
                        <FolderIcon className="w-5 h-5" />
                    </button>
                </div>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    disabled={!text.trim() && !imagePreview}
                >
                    Save
                </button>
            </div>
        </div>
    );
};