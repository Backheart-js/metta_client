'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export interface IAppProps {}

export default function App(props: IAppProps) {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/home');
        }, 3500);

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
