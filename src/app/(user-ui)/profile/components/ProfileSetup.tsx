import React, { useEffect, useState } from 'react';
import ProfileButton from './Common/ProfileButton';
import ProfileTitle from './Common/ProfileTitle';
import Image from 'next/image';
import {
    getCurrentPushSubscription,
    registerPushNotifications,
    unregisterPushNotifications,
} from '@/utils/notifications/pushService';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = ({}) => {
    const [toggledEnabledNoti, setToggledEnabledNoti] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState({
        label: 'Tiếng Việt',
        value: 'vi',
        id: 1,
    });

    const handleToggle = () => {
        setPushNotificationEnabled(!toggledEnabledNoti);
        setToggledEnabledNoti(!toggledEnabledNoti);
    };

    const handleLanguageSelect = (item: any): void => {
        setSelectedLanguage(item);
    };

    const langList = [
        {
            label: 'Tiếng Việt',
            value: 'vi',
            id: 1,
        },
        {
            label: 'English (US)',
            value: 'en',
            id: 2,
        },
    ];

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
        (async () => {
            try {
                const checkSubscription = await getCurrentPushSubscription();

                setToggledEnabledNoti(!!checkSubscription);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="py-5 flex flex-col gap-4">
            <ProfileTitle label="Cài đặt" />
            <ProfileButton
                startIcon="/icons/setting/password-icon.svg"
                label="Đổi mật khẩu"
            />
            <ProfileButton
                startIcon="/icons/setting/language-icon.svg"
                label={selectedLanguage.label || 'Ngôn ngữ'}
                isSelect={true}
                selectedItem={selectedLanguage}
                items={langList}
                onSelect={handleLanguageSelect}
            />
            <div className="flex items-center justify-between h-[42px] p-2">
                <div className="center gap-4">
                    <Image
                        src="/icons/setting/notification-icon.svg"
                        alt="icon"
                        className=""
                        width={26}
                        height={26}
                    />
                    <p className="text-base md:text-lg font-medium text-gray-600">
                        Thông báo
                    </p>
                </div>
                <button
                    onClick={handleToggle}
                    className={`relative w-[48px] h-[24px] rounded-full transition-all duration-500 ease-in-out ${
                        toggledEnabledNoti ? 'bg-boldGreen' : 'bg-gray-200'
                    }`}
                >
                    <div
                        className={`absolute inset-0 rounded-full transition-transform duration-500 ease-in-out transform ${
                            toggledEnabledNoti
                                ? 'translate-x-[24px]'
                                : 'translate-x-0'
                        }`}
                    >
                        <div className="absolute inset-0 w-[24px] h-[24px] bg-white rounded-full shadow-md"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
