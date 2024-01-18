'use client';
import { category } from '@/types/category';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function MobileNavbar() {
    const pathname = usePathname();

    return (
        <div className="flex items-center h-[72px] w-full px-4 bg-gray-100 border-t-2 border-borderLightTheme shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            {category.map((category, index) => {
                const { Icon } = category;
                const isActive = pathname?.includes(category.path);

                return (
                    <div
                        className="flex-1 flex justify-center items-center"
                        key={index}
                    >
                        <Link href={category.path} className="h-full w-full">
                            <div className="mb-1 text-center">
                                <Icon
                                    style={
                                        isActive
                                            ? { color: '#407CE2' }
                                            : { color: '#666' }
                                    }
                                />
                            </div>
                            <p
                                className={clsx(
                                    isActive ? 'text-greenPrimary' : '',
                                    'text-xs text-center',
                                )}
                            >
                                {category.short_text}
                            </p>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default MobileNavbar;
