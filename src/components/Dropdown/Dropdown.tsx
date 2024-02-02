import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

export interface IDropdownProps {
    options: any[];
    rows?: number;
    children: React.ReactNode;
    onSelect: (option: any) => void;
}

export default function Dropdown({
    options,
    rows,
    children,
    onSelect,
}: IDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => {
        setIsOpen(false);
    });

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: any) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="hover:cursor-pointer" onClick={handleToggle}>
                {children}
            </div>
            {isOpen && (
                <ul className="absolute min-w-[180px] right-0 bg-white rounded overflow-hidden z-20 shadow-[rgba(0,0,0,0.35)_0px_5px_15px]">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="px-2 py-2 hover:cursor-pointer hover:bg-boldGreen hover:text-white transition-all"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
