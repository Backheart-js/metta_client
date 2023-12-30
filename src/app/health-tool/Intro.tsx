'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ToolImage from '../../assets/image/tools.png';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {};

function Intro({}: Props) {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);

    const handleNextPage = (): void => {};

    return (
        <div>
            {step === 1 ? (
                <section>
                    <div className="max-w-[60%] mx-auto center">
                        <Image src={ToolImage} alt="tool-image" />
                    </div>
                    <div className="">
                        <h1>
                            Chào mừng bạn đến với công cụ tính chỉ số cơ thể
                        </h1>
                    </div>
                    <div className="">
                        <Button
                            className="bg-greenPrimary"
                            variant="contained"
                            onClick={() => setStep(2)}
                        >
                            Tiếp
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
