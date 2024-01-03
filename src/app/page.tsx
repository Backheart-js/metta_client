'use client';

import useSessionStorage from '@/hooks/useSessionStorage';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export interface IAppProps {}

export default function App(props: IAppProps) {
    const isLogin = useSessionStorage('isLogin');
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(isLogin);
            if (isLogin) {
                router.push('/home');
            } else {
                router.push('/auth');
            }
        }, 3800);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="center h-screen">
            <video
                src={require('../assets/video/medicalife.mp4')}
                autoPlay
                muted
                loop
                width="500"
            ></video>
        </div>
    );
}
