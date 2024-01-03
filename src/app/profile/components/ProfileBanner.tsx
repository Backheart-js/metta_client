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
            <img
                src={avatar}
                alt={avatar_alt}
                className="rounded-full w-[120px] h-[120px] bg-rose-500 object-cover"
            />
            <div className="flex flex-col items-center gap-1">
                <div className="text-[18px] font-semibold">{name}</div>
                <div className="text-[14px] italic">{nickname}</div>
            </div>
        </div>
    );
};

export default ProfileBanner;
