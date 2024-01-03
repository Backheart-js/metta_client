import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ProfileButtonProps {
    label: string;
    href?: string;
    isSelect?: boolean;
    items?: Array<string>;
    onSelect?: (selectedItem: string) => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
    const { label, href, isSelect, items, onSelect } = props;
    const [isShow, setIsShow] = useState(false);

    const handleSelect = () => {
        setIsShow(!isShow);
    };
    const handleSelectItem = (selectedItem: string) => {
        setIsShow(false);
        if (onSelect) {
            onSelect(selectedItem);
        }
    };

    return isSelect ? (
        <div className="relative">
            <div
                onClick={handleSelect}
                className="w-full p-2 md:p-[12px_16px] border-2 border-zinc-800 rounded-[8px] cursor-pointer flex justify-between items-center"
            >
                <div className="text-[14px] md:text-[16px]">{label}</div>
                {isShow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            {isShow ? (
                <div className="absolute bg-white w-full top-[50px] md:top-[60px] border-2 border-zinc-800 rounded-[8px] z-10">
                    {items &&
                        items.map((item, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer p-[8px_12px] text-[14px] md:text-[16px] ${
                                    index === 0
                                        ? 'rounded-t-[8px]'
                                        : index === items.length - 1
                                        ? 'rounded-b-[8px]'
                                        : ''
                                } hover:bg-zinc-200`}
                                onClick={() => handleSelectItem(item)}
                            >
                                {item}
                            </div>
                        ))}
                </div>
            ) : (
                ''
            )}
        </div>
    ) : (
        <a
            href={href}
            className="w-full p-2 md:p-[12px_16px] border-2 border-zinc-800 rounded-[8px] cursor-pointer flex justify-between items-center"
        >
            <div className="text-[14px] md:text-[16px]">{label}</div>
            <KeyboardArrowRightIcon />
        </a>
    );
};

export default ProfileButton;
