import { category } from '@/types/category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function MobileNavbar() {
    const pathname = usePathname();
    const mobileCategory = category.slice(0, -1);

    return (
        <div className="flex items-center h-[72px] w-full px-4 bg-white border-t-2 border-borderLightTheme shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            {mobileCategory.map((category, index) => {
                const { Icon } = category;
                const isActive = pathname.includes(category.path);

                return (
                    <div
                        className="flex-1 flex justify-center items-center"
                        key={index}
                    >
                        <Link href={category.path} className="h-full w-full">
                            <div className="mb-1 text-center">
                                <Icon style={{ color: '#666' }} />
                            </div>
                            <p className="text-xs text-center">
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
