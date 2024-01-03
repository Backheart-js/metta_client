import React from 'react';
import ProfileButton from './Common/ProfileButton';
import ProfileTitle from './Common/ProfileTitle';

interface ProfilePolicyProps {}

const ProfilePolicy: React.FC<ProfilePolicyProps> = (props) => {
    const {} = props;

    return (
        <div className="py-5 flex flex-col gap-3">
            <ProfileTitle label="Điều khoản và quy định" />
            <ProfileButton label="Quy định sử dụng" />
            <ProfileButton label="Trợ giúp" />
            <ProfileButton label="Gửi phản hồi, góp ý" />
        </div>
    );
};

export default ProfilePolicy;
