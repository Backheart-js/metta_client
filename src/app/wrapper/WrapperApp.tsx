'use client';

import React, { useEffect, useState } from 'react';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useAppSelector } from '@/lib/hooks';
import { registerServiceWorker } from '@/utils/serviceWorker/serviceWorker';

export interface IWrapperProps {
    children: React.ReactNode;
    isLoading: boolean;
}

export default function Wrapper({ children, isLoading }: IWrapperProps) {
    const { isProgress, text } = useAppSelector((state) => state.loading);

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

    return (
        <div>
            {isLoading ? (
                <div className="fixed center bg-white inset-0 z-[99]">
                    <video
                        autoPlay
                        muted
                        loop
                        controls={false}
                        playsInline
                        preload="auto"
                        width="500"
                    >
                        <source
                            src={require('../../assets/video/medicalife.mp4')}
                            type="video/mp4"
                        />
                    </video>
                </div>
            ) : (
                children
            )}
            <LoadingModal text={text} showing={isProgress} />
        </div>
    );
}
