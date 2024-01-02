'use client';

import React, { useState } from 'react';
import Assistant from '../../assets/image/assistant-doctor.jpg';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {};

const Intro = ({}: Props) => {
    const router = useRouter();
    const [introStep, setIntroStep] = useState<number>(1);

    const handleNextPage = (): void => {
        router.push('/virtual-assistant/chat/1');
    };

    return (
        <>
            {introStep === 1 && (
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
                                Nơi giải đáp mọi thắc mắc về vấn đề sức khỏe của
                                bạn bằng công nghệ trí tuệ nhân tạo
                            </p>
                        </div>
                    </div>
                    <div className="px-10 sm:px-20 md:px-5 mt-12 md:flex md:items-center justify-center">
                        <Button
                            variant="contained"
                            className="flex-y relative w-full md:w-[70%] bg-boldGreen hover:bg-boldGreen text-white text-lg md:text-base h-14 sm:h-12 md:h-10 rounded-2xl"
                            onClick={() => setIntroStep(2)}
                        >
                            Tiếp
                            <ArrowForwardIosIcon className="absolute top-[50%] translate-y-[-50%] right-6 text-base" />
                        </Button>
                    </div>
                </div>
            )}
            {introStep !== 1 && (
                <div className="">
                    <section className="h-[400px] center-y flex-col">
                        <p className="text-gray-500 text-2xl">Mô tả</p>
                        <span className="text-gray-400 text-sm">
                            Nội dung mô tả
                        </span>
                    </section>
                    <section className="mt-8 pb-20">
                        <div className="center-y gap-2 hover:cursor-pointer">
                            <input
                                className="w-3 h-3"
                                type="checkbox"
                                name=""
                                id="agree-checkbox"
                            />
                            <label
                                htmlFor="agree-checkbox"
                                className="text-gray-500"
                            >
                                Tôi đồng ý với điều khoản sử dụng
                            </label>
                        </div>
                        <div className="px-10 sm:px-20 md:px-5 mt-12 md:flex md:items-center justify-center">
                            <Button
                                variant="contained"
                                className="flex-y relative w-full md:w-[70%] bg-boldGreen hover:bg-boldGreen text-white text-lg md:text-base h-14 sm:h-12 md:h-10 rounded-2xl"
                                onClick={handleNextPage}
                            >
                                Khám phá thôi
                            </Button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Intro;
