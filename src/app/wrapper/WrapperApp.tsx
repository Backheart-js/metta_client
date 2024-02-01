'use client';

import React, { useEffect, useState } from 'react';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { registerServiceWorker } from '@/utils/serviceWorker/serviceWorker';

export interface IWrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
    const router = useRouter();
    const { isProgress, text } = useAppSelector((state) => state.loading);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Connect service worker
        (async () => {
            try {
                await registerServiceWorker();
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
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
                router.push('/auth/login');
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
