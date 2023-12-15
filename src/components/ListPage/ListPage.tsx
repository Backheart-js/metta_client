'use client';
import React, { useState } from 'react';
import TitleList from './TitleList';
import { Button } from '@mui/material';
import CardArticle from '../CardArticle/CardArticle';

interface IListPage {
    layout: string;
    id: string;
    title: string;
    showAllPath: string;
    data: any[];
}

function ListPage({ layout, id, title, showAllPath = '/', data }: IListPage) {
    const [first, setfirst] = useState();

    return (
        <div id={id}>
            {layout === 'slide' ? (
                <TitleList title={title} showAllPath={showAllPath} />
            ) : (
                <div className="">
                    <h3 className="">{title}</h3>
                </div>
            )}
            <div>
                {layout === 'grid' ? (
                    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {data.map((item, index) => {
                            return (
                                <CardArticle
                                    path={showAllPath}
                                    articleData={item}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className=""></div>
                )}
            </div>
            {layout === 'grid' && (
                <div className="w-full center">
                    <Button variant="contained" href={showAllPath}>
                        Xem thêm
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ListPage;
