'use client';
import React, { useEffect, useState } from 'react';
import TitleList from './TitleList';
import { Button } from '@mui/material';
import CardArticle from '../CardArticle/CardArticle';
import { IArticleType } from '@/types/articleType';
import urlSlug from 'url-slug';
import SlideCarousel from '../SlideCarousel/SlideCarousel';

interface IListPage {
    layout: string;
    id: string;
    title: string;
    showAllPath: string;
    data: IArticleType[];
}

function ListPage({ layout, id, title, showAllPath = '/', data }: IListPage) {
    const [hotNews, setHotNews] = useState<IArticleType[]>([]);
    const [dailyNews, setDailyNews] = useState<IArticleType[]>([]);
    const [otherNews, setOtherNews] = useState<IArticleType[]>([]);

    const filterArticles = (data: IArticleType[]): void => {
        data.forEach((article) => {
            article.slug = urlSlug(article.mainTitle);

            switch (article.label) {
                case 'hot':
                    setHotNews((prev) => [...prev, article]);
                    break;
                case 'daily':
                    setDailyNews((prev) => [...prev, article]);
                    break;
                case 'other':
                    setOtherNews((prev) => [...prev, article]);
                    break;
                default:
                    throw new Error('Invalid label');
            }
        });
    };

    useEffect(() => {
        filterArticles(data);
    }, []);

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        <div id="main-content" className="sm:col-span-2">
                            <div className="">
                                <SlideCarousel articles={hotNews} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 mt-14 gap-4">
                                {dailyNews.slice(0, 2).map((news, index) => (
                                    <CardArticle
                                        path={showAllPath}
                                        articleData={news}
                                        key={index}
                                    />
                                    // <div className='col-span-1' key={index}>
                                    // </div>
                                ))}
                            </div>
                        </div>
                        <div
                            id="sub-content"
                            className="col-span-1 sm:col-span-2 lg:col-span-1"
                        >
                            {otherNews.slice(0, 5).map((news, index) => (
                                <div
                                    className={index > 0 ? 'mt-5' : ''}
                                    key={index}
                                >
                                    <CardArticle
                                        path={showAllPath}
                                        articleData={news}
                                        noThumbnail
                                    />
                                </div>
                            ))}
                        </div>
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
