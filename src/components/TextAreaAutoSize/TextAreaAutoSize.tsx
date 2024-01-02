import * as React from 'react';
import { styled } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

export interface ITextAreaAutoSizeProps {
    maxRows: number;
    value: string;
    handleSubmit: () => void;
    handleChange: (e: any) => void;
}

export default function CustomTextArea({
    maxRows,
    value,
    handleSubmit,
    handleChange,
}: ITextAreaAutoSizeProps) {
    return (
        <Textarea
            value={value}
            aria-label="empty textarea"
            placeholder="Nhập văn bản..."
            maxRows={maxRows}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();

                    handleSubmit();
                }
            }}
            onChange={(e) => handleChange(e)}
        />
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: transparent;
    resize: none;

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
