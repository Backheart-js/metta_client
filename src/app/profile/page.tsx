'use client';

import React from 'react';
import ProfileBanner from './components/ProfileBanner';
import ProfileInfo from './components/ProfileInfo';
import ProfileSetup from './components/ProfileSetup';
import ProfilePolicy from './components/ProfilePolicy';

type Props = {};

function Profile({}: Props) {
    return (
        <div className="container-sp pt-10 pb-[100px] md:pb-10 px-5 md:px-0">
            <ProfileBanner
                name="Name"
                nickname="Nickname"
                avatar="https://w0.peakpx.com/wallpaper/121/921/HD-wallpaper-blood-pixiv-beauty-samurai-new-anime-bg-wall-pixiv-fantasia-beauty-samrai-girl-colour-warrior.jpg"
                avatar_alt="example"
            />
            <ProfileInfo />
            <div className="h-[2px] bg-zinc-800 w-full"></div>
            <ProfileSetup />
            <div className="h-[2px] bg-zinc-800 w-full"></div>
            <ProfilePolicy />
            <div className="w-full p-2 md:p-[12px_16px] border-2 border-rose-600 rounded-[8px] cursor-pointer text-[14px] md:text-[16px] text-rose-600 text-center">
                Đăng xuất
            </div>
        </div>
    );
}

export default Profile;
