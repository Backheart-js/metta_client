import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface ProfileBannerProps {
    avatar: string;
    avatar_alt: string;
    name: string;
    nickname: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = (props) => {
    const { avatar, avatar_alt, name, nickname } = props;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative center w-[120px] h-[120px] overflow-hidden">
                <Avatar
                    sx={{ width: 120, height: 120 }}
                    alt={name}
                    src={avatar}
                />
                <div className="absolute center bottom-[5%] right-0 bg-lightgreen border-2 border-white rounded-full w-8 h-8">
                    <Image
                        src="/icons/setting/camera-icon.svg"
                        alt="icon"
                        className=""
                        width={18}
                        height={18}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="text-[18px] font-semibold">{name}</div>
                <div className="text-[14px] italic">{nickname}</div>
            </div>
        </div>
    );
};

export default ProfileBanner;
