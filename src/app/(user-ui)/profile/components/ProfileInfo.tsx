import React from 'react';
import ProfileButton from './Common/ProfileButton';
import ProfileTitle from './Common/ProfileTitle';
import ProfileIcon from '/icons/setting/user-icon.svg';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
    const {} = props;

    return (
        <div className="mt-8 pb-5 flex flex-col gap-3">
            <ProfileTitle label="Cá nhân" />
            <ProfileButton
                startIcon="/icons/setting/user-icon.svg"
                label="Thông tin người dùng"
            />
        </div>
    );
};

export default ProfileInfo;
