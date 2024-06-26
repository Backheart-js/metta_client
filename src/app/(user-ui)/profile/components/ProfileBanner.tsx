import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface ProfileBannerProps {
    avatar: string;
    name: string;
    nickname: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = (props) => {
    const { avatar, name, nickname } = props;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative center w-[120px] h-[120px] overflow-hidden">
                <Avatar
                    sx={{ width: 120, height: 120 }}
                    alt={name}
                    src={avatar}
                />
            </div>
            <div className="flex flex-col items-center gap-1">
                <div className="text-[18px] font-semibold">{name}</div>
                <div className="text-[14px] italic">{nickname}</div>
            </div>
        </div>
    );
};

export default ProfileBanner;
