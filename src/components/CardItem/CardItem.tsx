import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './CardItem.module.scss';
import clsx from 'clsx';

interface ICardItem {
    path: string;
    thumbnailUrl?: string;
    title?: string;
    summary?: string;
    author?: string;
}

function CardItem({ path, thumbnailUrl, title, summary, author }: ICardItem) {
    return (
        <Link href={path} className="">
            <div className="w-[180px] shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] overflow-hidden rounded-xl">
                <div
                    className="w-full pt-[100%] bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                ></div>
                <div className="px-2 py-4">
                    <div className="">
                        <h3
                            className={clsx(
                                styles.title,
                                'text-base text-boldGreen font-medium',
                            )}
                        >
                            {title}
                        </h3>
                    </div>
                    <div className="mt-2">
                        <p
                            className={clsx(
                                styles.summary,
                                'text-xs text-gray-500',
                            )}
                        >
                            {summary}
                        </p>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-500">
                            {author}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardItem;
