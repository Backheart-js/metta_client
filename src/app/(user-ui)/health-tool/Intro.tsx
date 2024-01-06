'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ToolImage from '@/assets/image/tools.png';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {};

function Intro({}: Props) {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);

    const handleNextPage = (): void => {
        router.push('/health-tool/tool');
    };

    return (
        <div>
            {step === 1 ? (
                <section className="px-4">
                    <div className="max-w-[80%] sm:max-w-[70%] md:max-w-[60%] mx-auto">
                        <Image src={ToolImage} alt="tool-image" />
                    </div>
                    <div className="px-4 sm:px-20 md:px-20 text-center flex flex-col items-center">
                        <h1 className="text-4xl md:text-3xl font-medium text-center mb-2">
                            Công cụ tính chỉ số cơ thể
                        </h1>
                        <p className="text-gray-400 text-lg md:text-base font-medium md:w-[80%]">
                            Tìm hiểu sức khỏe, định hình vóc dáng cùng công cụ
                            tính chỉ số cơ thể tuyệt vời!
                        </p>
                    </div>
                    <div className="px-10 sm:px-20 md:px-5 mt-12 md:flex md:items-center justify-center">
                        <Button
                            className="flex-y relative w-full md:w-[70%] bg-boldGreen hover:bg-boldGreen text-white text-lg md:text-base h-14 sm:h-12 md:h-10 rounded-2xl"
                            variant="contained"
                            onClick={() => setStep(2)}
                        >
                            Tiếp{' '}
                            <ArrowForwardIosIcon className="absolute top-[50%] translate-y-[-50%] right-6 text-base" />
                        </Button>
                    </div>
                </section>
            ) : (
                <section>
                    <div className="">Mô tả</div>
                    <div className="center-y">
                        <input type="checkbox" name="" id="" />
                        <span className="">Tôi đã đọc hết nội dung</span>
                    </div>
                    <div className="">
                        <Button
                            variant="contained"
                            onClick={() => handleNextPage()}
                        >
                            Tới trang công cụ
                        </Button>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Intro;
