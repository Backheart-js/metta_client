'use client';

import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Collapse } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import clsx from 'clsx';

interface IItem {
    label: string;
    value: string | number;
    id: number | string;
}

interface ProfileButtonProps {
    label?: string;
    startIcon: string | StaticImport;
    endIcon?: React.ReactNode;
    href?: string;
    isSelect?: boolean;
    selectedItem?: IItem;
    items?: Array<IItem>;
    onSelect?: (item: string) => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
    label,
    href = '/',
    isSelect,
    items,
    startIcon,
    selectedItem,
    onSelect,
}) => {
    const [isShow, setIsShow] = useState(false);

    const handleSelect = () => {
        setIsShow(!isShow);
    };
    const handleSelectItem = (item: string) => {
        if (onSelect) {
            onSelect(item);
        }
    };

    console.log('selectedItem: ', selectedItem);

    return isSelect ? (
        <div className="relative">
            <div
                onClick={handleSelect}
                className="w-full p-2 md:p-[12px_16px] rounded-[8px] cursor-pointer flex justify-between items-center"
            >
                <div className="center gap-4">
                    <Image
                        src={startIcon}
                        alt="icon"
                        className=""
                        width={26}
                        height={26}
                    />
                    <div className="text-base md:text-lg font-medium text-gray-600">
                        {label}
                    </div>
                </div>
                {isShow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <Collapse
                in={isShow}
                timeout="auto"
                unmountOnExit
                className="pl-4 md:px-5 pt-2"
            >
                {items &&
                    items.map((item) => (
                        <div
                            key={item.id}
                            className={clsx(
                                selectedItem?.id === item.id
                                    ? 'bg-gray-200'
                                    : '',
                                'hover:bg-gray-200 h-10 center-y justify-between cursor-pointer p-[8px_12px] text-[14px] md:text-[16px] transition-all',
                            )}
                            onClick={() => handleSelectItem(item)}
                        >
                            <p className="">{item.label}</p>
                            <div
                                className={clsx(
                                    selectedItem?.id === item.id
                                        ? 'block'
                                        : 'hidden',
                                )}
                            >
                                <DoneIcon className="text-boldGreen text-2xl" />
                            </div>
                        </div>
                    ))}
            </Collapse>
        </div>
    ) : (
        <Link
            href={href}
            className="w-full p-2 md:p-[12px_16px] rounded-[8px] cursor-pointer center-y justify-between"
        >
            <div className="center gap-4">
                <Image
                    src={startIcon}
                    alt="icon"
                    className=""
                    width={26}
                    height={26}
                />
                <p className="text-base md:text-lg font-medium text-gray-600">
                    {label}
                </p>
            </div>
            <KeyboardArrowRightIcon />
        </Link>
    );
};

export default ProfileButton;
