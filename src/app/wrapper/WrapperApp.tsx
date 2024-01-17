'use client';

import React, { useState } from 'react';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

export interface IWrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
    const router = useRouter();
    const { isProgress, text } = useAppSelector((state) => state.loading);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { isLogin } = await checkLoginStatus();
                if (!isLogin) {
                    router.push('/auth/login');
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.log('Lỗi: ', error);
            }
        })();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="fixed center bg-white inset-0 z-[99]">
                    <video
                        src={require('../../assets/video/medicalife.mp4')}
                        autoPlay
                        muted
                        loop
                        width="500"
                    ></video>
                </div>
            ) : (
                children
            )}
            <LoadingModal text={text} showing={isProgress} />
        </div>
    );
}
