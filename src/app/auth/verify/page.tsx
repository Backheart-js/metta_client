'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import auth from '@/utils/axios/auth';
import Image from 'next/image';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface IVerifyProps {}

export default function Verify(props: IVerifyProps) {
    const [verifySuccessfully, setVerifySuccessfully] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    // useEffect(() => {
    //     (async () => {
    //         if (id) {
    //             try {
    //                 const resVerify = await auth.verifyEmail(id);

    //                 if (resVerify.status === 200) {
    //                     setVerifySuccessfully(true);
    //                 }
    //             } catch (error) {
    //                 setVerifySuccessfully(false);
    //             }
    //         }
    //     })();
    // }, []);

    return (
        <div className="center px-3 h-screen">
            {verifySuccessfully ? (
                <div className="">
                    <div className="center">
                        <Image
                            src={'/images/Paper-Confetti.png'}
                            width={300}
                            height={300}
                            alt="Chào mừng"
                        />
                    </div>
                    <div className="center flex-col gap-4 mt-4">
                        <h1 className="font-semibold text-2xl text-center">
                            Xác thực email thành công
                        </h1>
                        <p className="text-center font-medium">
                            Từ giờ bạn có thể sử dụng địa chỉ email này để đăng
                            nhập
                        </p>
                    </div>
                    <div className="mt-10">
                        <Button
                            className="w-full bg-boldGreen text-white py-2"
                            variant="contained"
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            Tiếp theo
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="center flex-col">
                    <div className="">
                        <h1 className="font-semibold text-2xl text-center">
                            Không tìm thấy trang yêu cầu, vui lòng thử lại!
                        </h1>
                    </div>
                    <div className="mt-10">
                        <Button className="w-full py-2" variant="text">
                            Quay lại
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
