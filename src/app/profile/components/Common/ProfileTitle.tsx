import React from 'react';

interface ProfileTitleProps {
    label: string;
}

const ProfileTitle: React.FC<ProfileTitleProps> = (props) => {
    const { label } = props;

    return (
        <div className="text-18px md:text-[20px] font-semibold">{label}</div>
    );
};

export default ProfileTitle;
