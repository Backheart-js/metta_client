import React from 'react';

interface ProfileTitleProps {
    label: string;
}

const ProfileTitle: React.FC<ProfileTitleProps> = (props) => {
    const { label } = props;

    return <div className="text-lg md:text-xl font-bold">{label}</div>;
};

export default ProfileTitle;
