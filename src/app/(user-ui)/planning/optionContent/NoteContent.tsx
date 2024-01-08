'use client';

import { TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';

export interface INoteContentProps {
    contentInput: string;
    handleChange: (content: string) => void;
}

export default function NoteContent({
    contentInput,
    handleChange,
}: INoteContentProps) {
    const [content, setContent] = useState(contentInput);
    const handleContentChange = (event: any) => {
        const newContent = event.target.value;
        handleChange(newContent);
        // Giới hạn độ dài của nội dung không vượt quá 50 kí tự
        if (newContent.length <= 75) {
            setContent(newContent);
        }
    };

    return (
        <div className="px-3">
            <div className="min-h-10 py-2">
                <TextareaAutosize
                    autoFocus
                    className="text-base tracking-wide leading-6 w-full resize-none border-none bg-transparent outline-none"
                    minRows={1}
                    placeholder="Thêm ghi chú"
                    value={content}
                    onChange={handleContentChange}
                />
            </div>
            <div className="w-full center-y justify-end h-6 mt-1 px-2">
                <p className="text-base font-medium text-gray-500">
                    {`${content.length} / 75`}
                </p>
            </div>
        </div>
    );
}
