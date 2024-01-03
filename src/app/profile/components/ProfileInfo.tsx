import React from 'react';
import ProfileButton from './Common/ProfileButton';
import ProfileTitle from './Common/ProfileTitle';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
    const {} = props;

    return (
        <div className="py-5 flex flex-col gap-3">
            <ProfileTitle label="Cá nhân" />
            <ProfileButton label="Thông tin người dùng" />
        </div>
    );
};

export default ProfileInfo;
