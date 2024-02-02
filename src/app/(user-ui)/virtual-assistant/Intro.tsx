'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Assistant from '@/assets/image/assistant-doctor.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {};

const Intro = ({}: Props) => {
    const router = useRouter();

    const handleNextPage = (): void => {
        router.push('/virtual-assistant/chat/1');
    };

    return (
        <div>
            <div className="center">
                <div className="max-w-[60%]">
                    <Image src={Assistant} alt="Assistant thumbnail" />
                </div>
            </div>
            <div className="center my-8">
                <div className="text-center md:max-w-[60%]">
                    <h1 className="text-gray-600 text-2xl">
                        Chào mừng bạn tới với chương trình trợ lý ảo
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Nơi giải đáp mọi thắc mắc về vấn đề sức khỏe của bạn
                        bằng công nghệ trí tuệ nhân tạo
                    </p>
                </div>
            </div>
            <div className="px-10 sm:px-20 md:px-5 mt-12 md:flex md:items-center justify-center">
                <Button
                    variant="contained"
                    className="flex-y relative w-full md:w-[70%] bg-boldGreen hover:bg-boldGreen text-white text-lg md:text-base py-2 rounded-2xl"
                    onClick={handleNextPage}
                >
                    Tiếp
                    <ArrowForwardIosIcon className="absolute top-[50%] translate-y-[-50%] right-6 text-base" />
                </Button>
            </div>
        </div>
    );
};

export default Intro;
