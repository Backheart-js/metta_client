import React from 'react';
import ProfileButton from './Common/ProfileButton';
import ProfileTitle from './Common/ProfileTitle';

interface ProfilePolicyProps {}

const ProfilePolicy: React.FC<ProfilePolicyProps> = (props) => {
    const {} = props;

    return (
        <div className="py-5 flex flex-col gap-4">
            <ProfileTitle label="Điều khoản và quy định" />
            <ProfileButton
                startIcon="/icons/setting/rule-icon.svg"
                label="Quy định sử dụng"
            />
            <ProfileButton
                startIcon="/icons/setting/help-icon.svg"
                label="Trợ giúp"
            />
            <ProfileButton
                startIcon="/icons/setting/letter-icon.svg"
                label="Gửi phản hồi, góp ý"
            />
        </div>
    );
};

export default ProfilePolicy;
