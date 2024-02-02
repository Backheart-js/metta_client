'use client';

import React, { useEffect, useState } from 'react';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useAppSelector } from '@/lib/hooks';
import { registerServiceWorker } from '@/utils/serviceWorker/serviceWorker';
import {
    registerPushNotifications,
    unregisterPushNotifications,
} from '@/utils/notifications/pushService';

export interface IWrapperProps {
    children: React.ReactNode;
    isLoading: boolean;
}

export default function Wrapper({ children, isLoading }: IWrapperProps) {
    const { isProgress, text } = useAppSelector((state) => state.loading);
    async function setPushNotificationEnabled(enabled: boolean) {
        try {
            if (enabled) {
                await registerPushNotifications();
            } else {
                unregisterPushNotifications();
            }
        } catch (error) {
            if (enabled && Notification.permission === 'denied') {
                alert('Turn on');
            } else {
                alert('Please try again');
            }
        }
    }
    useEffect(() => {
        // Connect service worker
        (() => {
            registerServiceWorker();
            setPushNotificationEnabled(true);
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
