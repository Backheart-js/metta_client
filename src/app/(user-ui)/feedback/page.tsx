'use client';

import React, { useState } from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Button, Snackbar, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';
import feedbackSync from '@/utils/axios/feedback';
import { IFeedback } from '@/types/feedbackType';

export interface IFeedbackProps {}

export default function Feedback(props: IFeedbackProps) {
    const router = useRouter();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [notiContent, setNotiContent] = useState('');
    const [feedbackDataForm, setFeedbackDataForm] = useState<IFeedback>({
        email: '',
        subject: '',
        content: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setFeedbackDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Cập nhật trạng thái của form validation
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            feedbackDataForm.email,
        );
        const isSubjectValid = feedbackDataForm.subject.trim() !== '';
        const isContentValid = feedbackDataForm.content.trim() !== '';

        setIsFormValid(isEmailValid && isSubjectValid && isContentValid);
    };

    const sendFeedback = async () => {
        try {
            // Kiểm tra xem có đủ thông tin không
            if (
                feedbackDataForm.email.trim() === '' ||
                feedbackDataForm.subject.trim() === '' ||
                feedbackDataForm.content.trim() === ''
            ) {
                setNotiContent('Vui lòng điền đầy đủ thông tin');
                setOpenSnackBar(true);
                return;
            }

            // Kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(feedbackDataForm.email)) {
                setNotiContent('Định dạng email không hợp lệ');
                setOpenSnackBar(true);
                return;
            }

            // Tiến hành gửi phản hồi
            const createFeedbackRes = await feedbackSync.sendFeedback(
                feedbackDataForm,
            );

            if (createFeedbackRes.status === 201) {
                setFeedbackDataForm({
                    email: '',
                    subject: '',
                    content: '',
                });
                setNotiContent('Cảm ơn bạn đã phản hồi ý kiến');
                setOpenSnackBar(true);
            }
        } catch (error) {
            console.log(error);
            setNotiContent('Đã có lỗi xảy ra, vui lòng thử lại!');
            setOpenSnackBar(true);
        }
    };

    return (
        <div className="container-sp pt-4 pb-10 px-4">
            <div className="">
                <Button
                    variant="text"
                    startIcon={<ArrowBackIosIcon />}
                    className="text-boldGreen text-lg"
                    onClick={() => {
                        router.push('/profile');
                    }}
                >
                    Quay lại
                </Button>
            </div>
            <div className="">
                <h1 className="text-center text-3xl font-medium text-gray-700">
                    Gửi thư góp ý, đánh giá cho chúng tôi
                </h1>
                <form action="" className="w-full">
                    <div className="">
                        <p className="font-medium mb-2">Email của bạn</p>
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            value={feedbackDataForm.email}
                            name="email"
                            type="email"
                            placeholder="user@email.com"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <p className="text-xs font-semibold text-gray-600 mt-2">
                            Chúng tôi sẽ gửi phản hồi vào email bạn để lại
                        </p>
                    </div>
                    <div className="mt-8">
                        <p className="font-medium mb-2">Tiêu đề</p>
                        <TextField
                            value={feedbackDataForm.subject}
                            className="w-full"
                            id="outlined-basic"
                            type="text"
                            name="subject"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="font-medium mb-2">Chi tiết</p>
                        <TextareaAutosize
                            value={feedbackDataForm.content}
                            className="w-full"
                            minRows={3}
                            placeholder="Góp ý của bạn"
                            name="content"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-8 center">
                        <Button
                            className="bg-boldGreen rounded-2xl py-2 px-6 w-full text-white disabled:opacity-50"
                            variant="contained"
                            onClick={sendFeedback}
                            disabled={!isFormValid}
                        >
                            Gửi đi
                        </Button>
                    </div>
                </form>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackBar}
                autoHideDuration={3000}
                message={notiContent}
                onClose={() => setOpenSnackBar(false)}
            />
        </div>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

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

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
        theme.palette.mode === 'dark' ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
          theme.palette.mode === 'dark' ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
