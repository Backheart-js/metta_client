import useClickOutside from '@/hooks/useClickOutside';
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
                <ul className="absolute min-w-[180px] right-0 bg-white rounded overflow-hidden z-20 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="px-2 py-[6px] hover:cursor-pointer hover:bg-gray-100 transition-all"
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
