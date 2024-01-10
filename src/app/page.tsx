'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export interface IAppProps {}

export default function App(props: IAppProps) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (status !== 'loading') {
                const nextGo = session ? '/home' : '/auth';
                router.push(nextGo);
            }
        }, 3500);

        return () => {
            clearTimeout(timeout);
        };
    }, [router, session, status]);

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
