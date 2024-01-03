import React, { useState } from 'react';
import ProfileButton from './Common/ProfileButton';
import ProfileTitle from './Common/ProfileTitle';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
    const {} = props;
    const [isToggled, setToggled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleToggle = () => {
        setToggled(!isToggled);
    };

    const handleLanguageSelect = (selectedLanguage: string) => {
        setSelectedLanguage(selectedLanguage);
    };

    return (
        <div className="py-5 flex flex-col gap-3">
            <ProfileTitle label="Cài đặt" />
            <ProfileButton label="Đổi mật khẩu" />
            <ProfileButton
                label={selectedLanguage || 'Ngôn ngữ'}
                isSelect={true}
                items={['Tiếng Anh', 'Tiếng đuồi bầu', 'Tiếng Việt']}
                onSelect={handleLanguageSelect}
            />
            <div className="flex items-center justify-between">
                <div>Thông báo</div>
                <button
                    onClick={handleToggle}
                    className={`relative w-[48px] h-[24px] rounded-full transition-all duration-500 ease-in-out ${
                        isToggled ? 'bg-rose-500' : 'bg-zinc-300'
                    }`}
                >
                    <div
                        className={`absolute inset-0 rounded-full transition-transform duration-500 ease-in-out transform ${
                            isToggled ? 'translate-x-[24px]' : 'translate-x-0'
                        }`}
                    >
                        <div className="absolute inset-0 w-[24px] h-[24px] bg-white rounded-full shadow-md"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
