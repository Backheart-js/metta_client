import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IListPage {
    title: string;
    showAllPath: string;
}

function TitleList({ title, showAllPath }: IListPage) {
    const router = useRouter();

    const handleShowAll = () => {
        router.push(showAllPath);
    };

    return (
        <div className="center-y justify-between">
            <button onClick={handleShowAll}>
                <h3 className="text-lg">{title}</h3>
            </button>
            <Link className="text-bluePrimary text-sm" href={showAllPath}>
                Xem thêm
            </Link>
        </div>
    );
}

export default TitleList;
