'use client';
import React, { useEffect, useState } from 'react';
import TitleList from './common/TitleList';
import { Button } from '@mui/material';
import CardItem from '../CardItem/CardItem';
import { IArticleType } from '@/types/articleType';
import urlSlug from 'url-slug';
import SlideCarousel from '../SlideCarousel/SlideCarousel';

interface IListArticlePage {
    layout: string;
    title: string;
    showAllPath: string;
    data: IArticleType[];
}

function ListArticlePage({
    layout,
    title,
    showAllPath = '/',
    data,
}: IListArticlePage) {
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
        <div>
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
                                <SlideCarousel>
                                    {hotNews.map((article, index) => (
                                        <CardItem
                                            path={`/news/${article.slug}`}
                                            thumbnailUrl={article.thumbnailUrl}
                                            mainTitle={article.mainTitle}
                                            description={article.description}
                                            subText1={article.author}
                                            subText2={article.date}
                                            key={index}
                                        />
                                    ))}
                                </SlideCarousel>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 mt-14 gap-4">
                                {dailyNews.slice(0, 2).map((news, index) => (
                                    <CardItem
                                        path={showAllPath}
                                        thumbnailUrl={news.thumbnailUrl}
                                        mainTitle={news.mainTitle}
                                        description={news.description}
                                        subText1={news.author}
                                        subText2={news.date}
                                        key={index}
                                    />
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
                                    <CardItem
                                        path={showAllPath}
                                        mainTitle={news.mainTitle}
                                        description={news.description}
                                        subText1={news.author}
                                        subText2={news.date}
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

export default ListArticlePage;
